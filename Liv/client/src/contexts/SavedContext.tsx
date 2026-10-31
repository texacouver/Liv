import { createContext, useContext, useState, type ReactNode } from "react";

const STORAGE_KEY = "liv-saved-ids-v1";
const storageWarning = "Saved places are available for this session only. Browser storage is unavailable or invalid.";

function readSaved() {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(value) || !value.every((id) => Number.isSafeInteger(id) && id > 0)) {
      throw new Error("Invalid saved IDs");
    }
    return { ids: Array.from(new Set<number>(value)), warning: "" };
  } catch {
    return { ids: [] as number[], warning: storageWarning };
  }
}

const SavedContext = createContext<{
  savedIds: number[];
  toggleSaved: (id: number) => void;
} | null>(null);

export function SavedProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState(readSaved);

  function toggleSaved(id: number) {
    const ids = saved.ids.includes(id) ? saved.ids.filter((item) => item !== id) : [...saved.ids, id];
    let warning = "";
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } catch {
      warning = storageWarning;
    }
    setSaved({ ids, warning });
  }

  return <SavedContext.Provider value={{ savedIds: saved.ids, toggleSaved }}>
    {saved.warning && <p role="status" className="liv-demo-note liv-storage-warning">{saved.warning}</p>}
    {children}
  </SavedContext.Provider>;
}

export function useSaved() {
  const context = useContext(SavedContext);
  if (!context) throw new Error("useSaved requires SavedProvider");
  return context;
}
