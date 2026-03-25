import { useState, useEffect } from "react";
import { backendUrl } from "../../shared/company";

const CACHE_KEY = "hestiq_team";

let inflightPromise = null;

export function getTeam() {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) return Promise.resolve(JSON.parse(cached));
  } catch {}

  if (!inflightPromise) {
    inflightPromise = fetch(`${backendUrl}/team`)
      .then((r) => r.json())
      .then((data) => {
        const list = data.success && Array.isArray(data.members) ? data.members : [];
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(list));
        } catch {}
        return list;
      })
      .catch(() => [])
      .finally(() => {
        inflightPromise = null;
      });
  }

  return inflightPromise;
}

export function useTeam() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeam()
      .then(setMembers)
      .finally(() => setLoading(false));
  }, []);

  return { members, loading };
}
