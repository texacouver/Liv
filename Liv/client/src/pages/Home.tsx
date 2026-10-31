import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useGeolocation } from "@/hooks/useGeolocation";
import { formatValidUntil, parseCoordinate } from "@/lib/utils";
import { Listing } from "@shared/schema";
import { CircleDollarSign, Clock3, Heart, MapPin, Navigation, Search, Sparkles } from "lucide-react";
import { useSaved } from "@/contexts/SavedContext";
import { BottomNavigation } from "@/components/BottomNavigation";

const categories = [{ id: "all", label: "For you" }, { id: "events", label: "Music" }, { id: "restaurants", label: "Food" }, { id: "retail", label: "Local" }];
const categoryType = (id: string) => id === "events" ? "Event" : id === "restaurants" ? "Restaurant Deal" : "Retail Deal";
function distanceBetween(a: number, b: number, c: number, d: number) { const r = 6371, y = (c - a) * Math.PI / 180, x = (d - b) * Math.PI / 180, q = Math.sin(y / 2) ** 2 + Math.cos(a * Math.PI / 180) * Math.cos(c * Math.PI / 180) * Math.sin(x / 2) ** 2; return r * 2 * Math.atan2(Math.sqrt(q), Math.sqrt(1 - q)); }

export function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { savedIds, toggleSaved } = useSaved();
  const [, setLocation] = useLocation();
  const { location: deviceLocation } = useGeolocation();
  const { data: listings, isLoading, error, refetch: retryListings } = useQuery<Listing[]>({ queryKey: ["/api/listings"] });
  const { data: recommendations } = useQuery<Listing[]>({ queryKey: ["/api/recommendations", { limit: 6 }], queryFn: async () => { const response = await fetch("/api/recommendations?limit=6"); return response.ok ? response.json() : []; } });
  const { data: searchResults, isLoading: isSearching, error: searchError, refetch: retrySearch } = useQuery<Listing[]>({ queryKey: ["/api/listings/search", searchQuery], queryFn: async () => { const response = await fetch(`/api/listings/search?q=${encodeURIComponent(searchQuery.trim())}`); if (!response.ok) throw new Error("Search failed"); return response.json(); }, enabled: Boolean(searchQuery.trim()) });
  const source = searchQuery.trim() ? searchResults : recommendations?.length ? recommendations : listings;
  const visible = (source || []).filter((listing) => activeCategory === "all" || listing.type === categoryType(activeCategory)).map((listing) => ({ ...listing, distance: deviceLocation ? distanceBetween(deviceLocation.latitude, deviceLocation.longitude, parseCoordinate(listing.latitude), parseCoordinate(listing.longitude)) : undefined }));

  return <main className="liv-home">
    <header className="liv-home-header"><div className="liv-location"><span className="liv-wordmark">liv</span><span><MapPin size={13} /> Vancouver</span></div></header>
    <section className="liv-home-intro"><h1>Tonight</h1><span>Prototype · Sample Vancouver listings, not live offers.</span></section>
    <label className="liv-search"><Search size={19} aria-hidden="true" /><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Find your kind of night" aria-label="Search places and events" /></label>
    <div className="liv-category-list" role="tablist" aria-label="Categories">{categories.map((category) => <button key={category.id} role="tab" aria-selected={activeCategory === category.id} className={activeCategory === category.id ? "is-active" : ""} onClick={() => setActiveCategory(category.id)}>{category.label}</button>)}</div>
    {error && <Alert><AlertDescription>Unable to load listings right now. <button onClick={() => retryListings()}>Try again</button></AlertDescription></Alert>}
    {searchError && <Alert><AlertDescription>Search could not load. <button onClick={() => retrySearch()}>Try again</button></AlertDescription></Alert>}
    <section className="liv-card-list" aria-label="Recommended places">
      {isLoading || isSearching ? [1, 2, 3].map((item) => <div className="liv-poster-skeleton" key={item}><Skeleton className="h-56 w-full rounded-2xl bg-white/10" /><Skeleton className="mt-4 h-9 w-2/3 bg-white/10" /></div>) : visible.map((listing) => {
        const isSaved = savedIds.includes(listing.id);
        return <article className="liv-poster-card" key={listing.id}><div className="liv-poster-image"><img src={listing.imageUrl} alt="" /><span className="liv-poster-date">Sample<br />listing</span><button className={`liv-save-button ${isSaved ? "is-saved" : ""}`} aria-label={`${isSaved ? "Remove" : "Save"} ${listing.name}`} aria-pressed={isSaved} onClick={() => toggleSaved(listing.id)}><Heart size={18} fill={isSaved ? "currentColor" : "none"} /></button></div><div className="liv-poster-copy"><h2>{listing.name}</h2><p>{listing.city} · {listing.type.replace(" Deal", "")}</p></div><div className="liv-poster-facts"><span><Clock3 size={13} /> Sample end: {formatValidUntil(listing.validUntil)}</span>{listing.distance !== undefined && <span><Navigation size={13} /> {listing.distance.toFixed(1)} km</span>}<span><CircleDollarSign size={13} /> {listing.priceRange || "Price not provided"}</span></div><footer className="liv-poster-footer"><p><Sparkles size={13} /><span><strong>Sample listing</strong>Availability and prices are not verified.</span></p><button className="liv-primary-action" onClick={() => setLocation(`/detail/${listing.id}`)}>View</button></footer></article>;
      })}
      {!error && !searchError && !isLoading && !isSearching && visible.length === 0 && <p className="liv-empty">No places found. Try another search.</p>}
    </section>
    <BottomNavigation />
  </main>;
}
