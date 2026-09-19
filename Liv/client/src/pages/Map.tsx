import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { BottomNavigation } from "@/components/BottomNavigation";
import { InteractiveMap } from "@/components/InteractiveMap";
import { useGeolocation } from "@/hooks/useGeolocation";
import { calculateDistance, parseCoordinate } from "@/lib/utils";
import { Listing } from "@shared/schema";
import { MapPin, Navigation } from "lucide-react";

export function Map() {
  const [, setLocation] = useLocation();
  const [category, setCategory] = useState("all");
  const { location: userLocation } = useGeolocation();
  const { data: listings = [] } = useQuery<Listing[]>({ queryKey: ["/api/listings"] });
  const nearby = useMemo(() => listings.filter((listing) => category === "all" || listing.type === (category === "events" ? "Event" : category === "food" ? "Restaurant Deal" : "Retail Deal")).map((listing) => ({ ...listing, distance: userLocation ? calculateDistance(userLocation.latitude, userLocation.longitude, parseCoordinate(listing.latitude), parseCoordinate(listing.longitude)) : undefined })).sort((a, b) => (a.distance || 0) - (b.distance || 0)), [listings, category, userLocation]);

  return <main className="liv-page"><header className="liv-page-header"><span className="liv-wordmark">liv</span><span>Nearby</span></header><section className="liv-page-intro"><p>Vancouver</p><h1>Close by</h1><span>What is worth the trip right now.</span></section>
    <div className="liv-category-list">{[["all", "All"], ["events", "Music"], ["food", "Food"], ["retail", "Local"]].map(([id, label]) => <button key={id} className={category === id ? "is-active" : ""} onClick={() => setCategory(id)}>{label}</button>)}</div>
    <section className="liv-map-surface">{nearby.length > 0 && <InteractiveMap listings={nearby} center={userLocation ? [userLocation.latitude, userLocation.longitude] : [49.2827, -123.1207]} zoom={13} height="280px" />}</section>
    <section className="liv-nearby-list">{nearby.map((listing) => <button className="liv-nearby-row" key={listing.id} onClick={() => setLocation(`/detail/${listing.id}`)}><img src={listing.imageUrl} alt="" /><span><b>{listing.name}</b><small><MapPin size={13} /> {listing.city} · {listing.priceRange || "$$"}</small></span><em>{listing.distance !== undefined ? <><Navigation size={13} /> {listing.distance.toFixed(1)} km</> : "View"}</em></button>)}</section><BottomNavigation />
  </main>;
}
