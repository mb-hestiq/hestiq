import { useState, useEffect } from "react";
import backendUrl from "./backend";
import rawServices from "../../shared/services.js";

const CACHE_KEY = "hestiq_services";

let inflightPromise = null;

export function getServices() {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) return Promise.resolve(JSON.parse(cached));
  } catch {}

  if (!inflightPromise) {
    inflightPromise = fetch(`${backendUrl}/services`)
      .then((r) => r.json())
      .then((data) => {
        const list = data.success && Array.isArray(data.services) ? data.services : rawServices;
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify(list));
        } catch {}
        return list;
      })
      .catch(() => rawServices)
      .finally(() => {
        inflightPromise = null;
      });
  }

  return inflightPromise;
}

export function useServices() {
  const [services, setServices] = useState(rawServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServices()
      .then(setServices)
      .finally(() => setLoading(false));
  }, []);

  return { services, loading };
}
