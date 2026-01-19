console.log("ZABINI HUB", "v1.0");

/*
  Lightweight hub helper
  - checks availability of subdomains
  - purely optional UX enhancement
*/

const services = [
  { id: "mvp", url: "https://mvp.zabini.org", label: "MVP" },
  { id: "wiki", url: "https://wiki.zabini.org", label: "Wiki" },
  { id: "event", url: "https://event.zabini.org", label: "Events" }
];

async function checkService(service) {
  try {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 2500);

    const res = await fetch(service.url, {
      method: "HEAD",
      mode: "no-cors",
      signal: controller.signal
    });

    return true;
  } catch {
    return false;
  }
}

async function runHealthCheck() {
  for (const s of services) {
    const el = document.querySelector(`[data-service="${s.id}"]`);
    if (!el) continue;

    const ok = await checkService(s);
    el.dataset.status = ok ? "ok" : "down";
    el.title = ok ? `${s.label} reachable` : `${s.label} not reachable`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  runHealthCheck();
});