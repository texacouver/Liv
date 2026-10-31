import assert from "node:assert/strict";
import { test } from "node:test";
import { once } from "node:events";
import express from "express";
import { chromium } from "playwright";
import type { IStorage } from "../server/storage";
import type { Listing } from "../shared/schema";
import path from "node:path";
import { mkdir } from "node:fs/promises";

// This exercises the real API routes with a controlled storage fixture, not PostgreSQL.
process.env.DATABASE_URL ||= "postgres://fixture:fixture@localhost:5432/fixture";
const { createRoutes } = await import("../server/routes");
const listing = {
  id: 7, name: "Demo Jazz", type: "Event", city: "Vancouver",
  description: "Fixture listing for the demo journey.", imageUrl: "/fixture.svg",
  latitude: "49.28", longitude: "-123.12", validUntil: "2025-07-01T23:00:00Z",
  qrCode: "DEMO-ONLY", priceRange: "$$", address: "Sample address",
} as Listing;

test("search route and complete browser-local shortlist journey", async (t) => {
  const storage = {
    getListings: async () => [listing],
    getListingById: async (id: number) => id === listing.id ? listing : null,
    searchListings: async (query: string) => listing.name.toLowerCase().includes(query.toLowerCase()) ? [listing] : [],
    getRecommendationsForUser: async () => [listing],
  } as unknown as IStorage;
  const app = express();
  app.use("/api", createRoutes(storage));
  app.get("/fixture.svg", (_req, res) => res.type("svg").send('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="800" height="500" fill="#224434"/></svg>'));
  const publicDir = path.resolve("dist/public");
  app.use(express.static(publicDir));
  app.get("*", (_req, res) => res.sendFile(path.join(publicDir, "index.html")));
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  t.after(() => new Promise<void>((resolve) => server.close(() => resolve())));
  const address = server.address() as { port: number };
  const base = `http://127.0.0.1:${address.port}`;

  for (const query of ["Jazz", "  Jazz  "]) {
    const response = await fetch(`${base}/api/listings/search?q=${encodeURIComponent(query)}`);
    assert.equal(response.status, 200);
    assert.equal((await response.json())[0].id, listing.id);
  }
  for (const query of ["", "   ", "q[]=Jazz"]) {
    const suffix = query.startsWith("q[]") ? query : `q=${encodeURIComponent(query)}`;
    assert.equal((await fetch(`${base}/api/listings/search?${suffix}`)).status, 400);
  }
  assert.equal((await fetch(`${base}/api/listings/7`)).status, 200);
  assert.equal((await fetch(`${base}/api/listings/999`)).status, 404);
  assert.equal((await fetch(`${base}/api/listings/7abc`)).status, 400);

  const browser = await chromium.launch({ headless: true, executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH });
  t.after(() => browser.close());
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const clientErrors: string[] = [];
  page.on("pageerror", (error) => clientErrors.push(error.message));
  await mkdir("test-results", { recursive: true });
  await page.goto(base);
  await page.getByRole("heading", { name: listing.name, exact: true }).waitFor();
  await page.getByRole("button", { name: "Saved", exact: true }).click();
  await page.getByText("Your shortlist is clear.").waitFor();
  await page.getByRole("button", { name: "Explore tonight" }).click();
  await page.getByRole("tab", { name: "Food", exact: true }).click();
  await page.getByText("No places found. Try another search.").waitFor();
  await page.getByRole("tab", { name: "For you", exact: true }).click();
  await page.getByRole("textbox", { name: "Search places and events" }).fill("Jazz");
  await page.getByRole("heading", { name: listing.name, exact: true }).waitFor();
  await page.screenshot({ path: "test-results/01-search.png", fullPage: true, animations: "disabled" });
  await page.getByRole("button", { name: "View", exact: true }).click();
  await page.getByRole("button", { name: "Save Demo Jazz", exact: true }).click();
  assert.equal(await page.getByRole("button", { name: "Remove Demo Jazz", exact: true }).getAttribute("aria-pressed"), "true");
  await page.screenshot({ path: "test-results/02-detail-saved.png", fullPage: true, animations: "disabled" });
  await page.getByRole("button", { name: "Saved", exact: true }).click();
  await page.getByRole("heading", { name: listing.name, exact: true }).waitFor();
  await page.reload();
  await page.getByRole("heading", { name: listing.name, exact: true }).waitFor();
  await page.screenshot({ path: "test-results/03-saved-after-reload.png", fullPage: true, animations: "disabled" });
  await page.getByRole("button", { name: "Remove Demo Jazz from saved", exact: true }).click();
  await page.reload();
  await page.getByText("Your shortlist is clear.").waitFor();
  await page.getByRole("button", { name: "Tonight", exact: true }).click();
  await page.getByRole("button", { name: "Save Demo Jazz", exact: true }).click();
  await page.getByRole("button", { name: "View", exact: true }).click();
  await page.getByRole("button", { name: "Remove Demo Jazz", exact: true }).waitFor();
  await page.getByRole("button", { name: "Preview demo code" }).click();
  await page.getByText("Preview only. This is not a ticket or a redeemable offer.").waitFor();

  // Storage persists across a new tab, but never seeds fake favorites.
  const reopened = await context.newPage();
  await reopened.goto(`${base}/favorites`);
  await reopened.getByRole("heading", { name: listing.name, exact: true }).waitFor();
  await reopened.close();
  await page.goto(base);
  await page.getByRole("textbox", { name: "Search places and events" }).fill("no-match");
  await page.getByText("No places found. Try another search.").waitFor();
  await page.route("**/api/listings/search?*", (route) => route.fulfill({ status: 500, body: "failed" }));
  await page.getByRole("textbox", { name: "Search places and events" }).fill("broken");
  await page.getByText("Search could not load.", { exact: false }).waitFor();
  assert.equal(await page.getByText("No places found. Try another search.").count(), 0);
  await page.unroute("**/api/listings/search?*");
  await page.getByRole("button", { name: "Try again" }).click();
  await page.getByText("No places found. Try another search.").waitFor();
  await page.goto(`${base}/detail/999`);
  await page.getByText("This listing was not found.", { exact: true }).waitFor();
  await page.route("**/api/listings", (route) => route.fulfill({ status: 500, body: "failed" }));
  await page.goto(`${base}/favorites`);
  await page.getByText("Saved places could not load.", { exact: false }).waitFor();
  assert.equal(await page.getByText("Your shortlist is clear.").count(), 0);
  await page.unroute("**/api/listings");

  // Corrupt data and blocked writes must not crash or promise persistence.
  await page.evaluate(() => localStorage.setItem("liv-saved-ids-v1", "{bad-json"));
  await page.goto(base);
  await page.getByRole("status").filter({ hasText: "session only" }).waitFor();
  await page.evaluate(() => { Storage.prototype.setItem = () => { throw new Error("blocked"); }; });
  await page.getByRole("button", { name: "Save Demo Jazz", exact: true }).click();
  await page.getByRole("button", { name: "Saved", exact: true }).click();
  await page.getByRole("heading", { name: listing.name, exact: true }).waitFor();
  await page.getByRole("status").filter({ hasText: "session only" }).waitFor();

  await page.setViewportSize({ width: 1280, height: 900 });
  await page.screenshot({ path: "test-results/04-desktop-saved.png", fullPage: true, animations: "disabled" });
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  assert.deepEqual(clientErrors, []);
});
