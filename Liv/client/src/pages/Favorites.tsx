import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Heart, MapPin } from "lucide-react";
import { Listing } from "@shared/schema";

export function Favorites() {
  const [, setLocation] = useLocation();
  const [favoriteIds, setFavoriteIds] = useState<number[]>([1, 2]);
  const { data: listings = [] } = useQuery<Listing[]>({ queryKey: ["/api/listings"] });
  const saved = listings.filter((listing) => favoriteIds.includes(listing.id));

  return <main className="liv-page"><header className="liv-page-header"><span className="liv-wordmark">liv</span><span>Saved</span></header><section className="liv-page-intro"><p>Your shortlist</p><h1>Saved for later</h1><span>Keep a few good options close.</span></section>
    <section className="liv-saved-list">{saved.map((listing) => <article className="liv-saved-row" key={listing.id}><img src={listing.imageUrl} alt="" /><div><h2>{listing.name}</h2><p><MapPin size={13} /> {listing.city} · {listing.priceRange || "$$"}</p></div><button className="liv-save-button is-saved" aria-label={`Remove ${listing.name} from saved`} onClick={() => setFavoriteIds((ids) => ids.filter((id) => id !== listing.id))}><Heart size={18} fill="currentColor" /></button><button className="liv-row-action" onClick={() => setLocation(`/detail/${listing.id}`)}>View</button></article>)}</section>
    {!saved.length && <section className="liv-empty-state"><Heart size={30} /><h2>Your shortlist is clear.</h2><p>Save a place from Tonight to return to it here.</p><button className="liv-primary-action" onClick={() => setLocation("/")}>Explore tonight</button></section>}<BottomNavigation />
  </main>;
}
