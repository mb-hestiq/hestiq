import backendUrl from "./backend";

const VISITOR_ID_KEY = "hestiq_vid";

function isLocal() {
  return /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);
}

function getVisitorId() {
  let vid = localStorage.getItem(VISITOR_ID_KEY);
  if (!vid) {
    vid = crypto.randomUUID();
    localStorage.setItem(VISITOR_ID_KEY, vid);
  }
  return vid;
}

export function track(event, data = {}) {
  if (isLocal()) return Promise.resolve();
  try {
    const visitorId = getVisitorId();
    return fetch(`${backendUrl}/analytics/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Visitor-Id": visitorId,
      },
      body: JSON.stringify({
        event,
        data,
        url: window.location.href,
        referrer: document.referrer,
        timestamp: Date.now(),
      }),
    }).catch(() => {});
  } catch {
    return Promise.resolve();
  }
}

export function trackBatch(events) {
  if (isLocal()) return Promise.resolve();
  try {
    const visitorId = getVisitorId();
    const payload = events.map((e) => ({
      event: e.event,
      data: e.data || {},
      url: e.url || window.location.href,
      referrer: e.referrer || document.referrer,
      timestamp: e.timestamp || Date.now(),
    }));
    return fetch(`${backendUrl}/analytics/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Visitor-Id": visitorId,
      },
      body: JSON.stringify(payload),
    }).catch(() => {});
  } catch {
    return Promise.resolve();
  }
}
