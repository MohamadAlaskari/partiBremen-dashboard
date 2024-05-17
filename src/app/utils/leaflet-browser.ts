// src/app/utils/leaflet-browser.ts
export async function loadLeaflet() {
  const L = await import('leaflet');
  return L;
}
