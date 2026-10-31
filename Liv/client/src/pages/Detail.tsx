import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Heart, MapPin, Ticket } from "lucide-react";
import { Listing } from "@shared/schema";
import { useSaved } from "@/contexts/SavedContext";
import { BottomNavigation } from "@/components/BottomNavigation";
import { formatValidUntil } from "@/lib/utils";

export function Detail() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { savedIds, toggleSaved } = useSaved();
  const { data: listing, isLoading, error, refetch } = useQuery<Listing>({
    queryKey: ["/api/listings", id],
    queryFn: async () => {
      const response = await fetch(`/api/listings/${id}`);
      if (!response.ok) throw new Error(response.status === 404 ? "This listing was not found." : "This listing could not load.");
      return response.json();
    },
  });

  if (isLoading || error || !listing) return <main className="liv-page">
    <button className="liv-back-button" onClick={() => setLocation("/")}>Back to Tonight</button>
    <p className="liv-empty" role="status">{isLoading ? "Loading listing…" : error?.message || "This listing was not found."}</p>
    {error && <button className="liv-primary-action" onClick={() => refetch()}>Try again</button>}
    <BottomNavigation />
  </main>;

  const isSaved = savedIds.includes(listing.id);
  return <main className="liv-detail">
    <header className="liv-detail-header">
      <button onClick={() => setLocation("/")}>Back</button><span className="liv-wordmark">liv</span>
      <button aria-label={`${isSaved ? "Remove" : "Save"} ${listing.name}`} aria-pressed={isSaved} onClick={() => toggleSaved(listing.id)}><Heart size={19} fill={isSaved ? "currentColor" : "none"} /></button>
    </header>
    <img className="liv-detail-image" src={listing.imageUrl} alt={listing.name} />
    <section className="liv-detail-copy">
      <p className="liv-demo-note">Prototype · Sample listing. Prices and availability are not verified.</p>
      <h1>{listing.name}</h1><p className="liv-detail-venue">{listing.city} · {listing.type.replace(" Deal", "")}</p>
      <div className="liv-detail-rows">
        <p><MapPin size={18} /><span><b>Location</b>{listing.address || listing.city}</span></p>
        <p><Ticket size={18} /><span><b>Price range</b>{listing.priceRange || "Not provided"}</span></p>
        <p><span><b>Sample end date</b>{formatValidUntil(listing.validUntil)}</span></p>
      </div>
      <p className="liv-detail-reason"><strong>About this listing</strong>{listing.description}</p>
      <p>Live wait times and ticketing are not available in this prototype.</p>
    </section>
    <footer className="liv-detail-footer"><button className="liv-primary-action" onClick={() => setLocation(`/qr/${listing.id}`)}>Preview demo code</button></footer>
    <BottomNavigation />
  </main>;
}
