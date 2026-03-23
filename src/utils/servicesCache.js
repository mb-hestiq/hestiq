import { useState, useEffect } from "react";
import { backendUrl } from "../../shared/company";

const CACHE_KEY = "hestiq_services";

let inflightPromise = null;

export function getServices() {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) return Promise.resolve(JSON.parse(cached));
  } catch {}

  if (!inflightPromise) {
    inflightPromise = fetch(`${backendUrl}/api/services`)
      .then((r) => r.json())
      .then((data) => {
        const list = data.success && Array.isArray(data.services) ? data.services : [];
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

export function useServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices()
      .then(setServices)
      .finally(() => setLoading(false));
  }, []);

  return { services, loading };
}
