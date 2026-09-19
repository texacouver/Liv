import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useGeolocation } from "@/hooks/useGeolocation";
import { parseCoordinate } from "@/lib/utils";
import { Listing } from "@shared/schema";
import { CircleDollarSign, Clock3, Heart, MapPin, Navigation, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const categories = [{ id: "all", label: "For you" }, { id: "events", label: "Music" }, { id: "restaurants", label: "Food" }, { id: "retail", label: "Local" }];
const categoryType = (id: string) => id === "events" ? "Event" : id === "restaurants" ? "Restaurant Deal" : "Retail Deal";
function distanceBetween(a: number, b: number, c: number, d: number) { const r = 6371, y = (c - a) * Math.PI / 180, x = (d - b) * Math.PI / 180, q = Math.sin(y / 2) ** 2 + Math.cos(a * Math.PI / 180) * Math.cos(c * Math.PI / 180) * Math.sin(x / 2) ** 2; return r * 2 * Math.atan2(Math.sqrt(q), Math.sqrt(1 - q)); }
function formatTime(value: string) { const date = new Date(value); return Number.isNaN(date.getTime()) ? "Tonight" : date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }); }

export function Home() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [, setLocation] = useLocation();
  const { location: deviceLocation } = useGeolocation();
  const { data: listings, isLoading, error } = useQuery<Listing[]>({ queryKey: ["/api/listings"] });
  const { data: recommendations } = useQuery<Listing[]>({ queryKey: ["/api/recommendations", { limit: 6 }], queryFn: async () => { const response = await fetch("/api/recommendations?limit=6"); return response.ok ? response.json() : []; } });
  const { data: searchResults, isLoading: isSearching } = useQuery<Listing[]>({ queryKey: ["/api/listings/search", searchQuery], queryFn: async () => { const response = await fetch(`/api/listings/search?q=${encodeURIComponent(searchQuery)}`); if (!response.ok) throw new Error("Search failed"); return response.json(); }, enabled: Boolean(searchQuery.trim()) });
  const source = searchQuery.trim() ? searchResults : recommendations?.length ? recommendations : listings;
  const visible = (source || []).filter((listing) => activeCategory === "all" || listing.type === categoryType(activeCategory)).map((listing) => ({ ...listing, distance: deviceLocation ? distanceBetween(deviceLocation.latitude, deviceLocation.longitude, parseCoordinate(listing.latitude), parseCoordinate(listing.longitude)) : undefined }));
  const toggleSaved = (id: number, name: string) => setSavedIds((ids) => {
    const isSaved = ids.includes(id);
    toast({ title: isSaved ? "Removed from Saved" : "Saved for later", description: name });
    return isSaved ? ids.filter((savedId) => savedId !== id) : [...ids, id];
  });

  return <main className="liv-home">
    <header className="liv-home-header"><div className="liv-location"><span className="liv-wordmark">liv</span><span><MapPin size={13} /> Vancouver</span></div><button className="liv-icon-button" aria-label="Adjust recommendations"><SlidersHorizontal size={19} /></button></header>
    <section className="liv-home-intro"><p>Friday night</p><h1>Tonight</h1><span>Good plans, close by.</span></section>
    <label className="liv-search"><Search size={19} aria-hidden="true" /><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Find your kind of night" aria-label="Search places and events" /></label>
    <div className="liv-category-list" role="tablist" aria-label="Categories">{categories.map((category) => <button key={category.id} role="tab" aria-selected={activeCategory === category.id} className={activeCategory === category.id ? "is-active" : ""} onClick={() => setActiveCategory(category.id)}>{category.label}</button>)}</div>
    {error && <Alert><AlertDescription>Unable to load listings right now.</AlertDescription></Alert>}
    <section className="liv-card-list" aria-label="Recommended places">
      {isLoading || isSearching ? [1, 2, 3].map((item) => <div className="liv-poster-skeleton" key={item}><Skeleton className="h-56 w-full rounded-2xl bg-white/10" /><Skeleton className="mt-4 h-9 w-2/3 bg-white/10" /></div>) : visible.slice(0, 6).map((listing, index) => {
        const isSaved = savedIds.includes(listing.id);
        return <article className="liv-poster-card" key={listing.id}><div className="liv-poster-image"><img src={listing.imageUrl} alt="" /><span className="liv-poster-date">{index === 0 ? <>Top<br />pick</> : <>Tonight<br />nearby</>}</span><button className={`liv-save-button ${isSaved ? "is-saved" : ""}`} aria-label={`${isSaved ? "Remove" : "Save"} ${listing.name}`} aria-pressed={isSaved} onClick={() => toggleSaved(listing.id, listing.name)}><Heart size={18} fill={isSaved ? "currentColor" : "none"} /></button></div><div className="liv-poster-copy"><h2>{listing.name}</h2><p>{listing.city} · {listing.type.replace(" Deal", "")}</p></div><div className="liv-poster-facts"><span><Clock3 size={13} /> Ends {formatTime(listing.validUntil)}</span>{listing.distance !== undefined && <span><Navigation size={13} /> {listing.distance.toFixed(1)} km</span>}<span><CircleDollarSign size={13} /> {listing.priceRange || "$$"}</span><span className="liv-availability">Low wait</span></div><footer className="liv-poster-footer"><p><Sparkles size={13} /><span><strong>Why Liv picked it</strong>A close match for your saved interests.</span></p><button className="liv-primary-action" onClick={() => setLocation(`/detail/${listing.id}`)}>View</button></footer></article>;
      })}
      {!isLoading && !isSearching && visible.length === 0 && <p className="liv-empty">No places found. Try another search.</p>}
    </section>
    <nav className="liv-dock" aria-label="Primary navigation"><button className="is-active" onClick={() => setLocation("/")}>Tonight</button><button onClick={() => setLocation("/map")}>Nearby</button><button onClick={() => setLocation("/favorites")}>Saved</button></nav>
  </main>;
}
