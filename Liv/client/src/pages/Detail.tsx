import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Heart, MapPin, Navigation, Ticket } from "lucide-react";
import { Listing } from "@shared/schema";

export function Detail() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { data: listing } = useQuery<Listing>({ queryKey: ["/api/listings", id], queryFn: async () => { const response = await fetch(`/api/listings/${id}`); if (!response.ok) throw new Error("Failed to fetch listing"); return response.json(); } });
  if (!listing) return <main className="liv-page"><p className="liv-empty">Loading event…</p></main>;
  return <main className="liv-detail"><header className="liv-detail-header"><button onClick={() => setLocation("/")}>Back</button><span className="liv-wordmark">liv</span><button aria-label={`Save ${listing.name}`}><Heart size={19} /></button></header><img className="liv-detail-image" src={listing.imageUrl} alt={listing.name} /><section className="liv-detail-copy"><p className="liv-detail-kicker">{listing.type.replace(" Deal", "")} · Tonight</p><h1>{listing.name}</h1><p className="liv-detail-venue">{listing.city}</p><div className="liv-detail-rows"><p><Navigation size={18} /><span><b>Getting there</b>12 min by transit</span></p><p><Ticket size={18} /><span><b>Tickets</b>{listing.priceRange || "$$"} per person</span></p><p><MapPin size={18} /><span><b>Availability</b>Low wait</span></p></div><p className="liv-detail-reason"><strong>Why Liv picked it</strong>{listing.description}</p></section><footer className="liv-detail-footer"><button className="liv-primary-action" onClick={() => setLocation(`/qr/${listing.id}`)}>{listing.type === "Event" ? "View tickets" : "Use deal"}</button></footer></main>;
}
