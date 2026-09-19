import { useLocation } from "wouter";
import { Home, Heart, Map } from "lucide-react";

export function BottomNavigation() {
  const [location, setLocation] = useLocation();

  const isActive = (path: string) => location === path;

  return (
    <nav className="liv-dock" aria-label="Primary navigation">
      <button className={isActive("/") ? "is-active" : ""} onClick={() => setLocation("/")}><Home size={17} />Tonight</button>
      <button className={isActive("/map") ? "is-active" : ""} onClick={() => setLocation("/map")}><Map size={17} />Nearby</button>
      <button className={isActive("/favorites") ? "is-active" : ""} onClick={() => setLocation("/favorites")}><Heart size={17} />Saved</button>
    </nav>
  );
}
