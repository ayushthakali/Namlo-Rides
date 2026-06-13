// Leaflet marker icons break in Vite because Vite hashes filenames at build time.
// Leaflet uses hardcoded relative paths that don't match the hashed names.
// Fix: import images through Vite so we get the correct URLs, then override Leaflet's icon.
    
import L    from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import icon2 from 'leaflet/dist/images/marker-icon-2x.png';
import shadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl: icon, iconRetinaUrl: icon2, shadowUrl: shadow });

// Rider — blue pulsing dot
export const riderIcon = L.divIcon({
  className: '',
  html: `<div style="position:relative;width:20px;height:20px">
    <div style="position:absolute;inset:0;background:#3b82f6;border-radius:50%;border:3px solid white;box-shadow:0 2px 8px rgba(59,130,246,.5)"></div>
    <div style="position:absolute;inset:-4px;background:rgba(59,130,246,.25);border-radius:50%;animation:ping 1.5s infinite"></div>
    <style>@keyframes ping{75%,100%{transform:scale(2);opacity:0}}</style>
  </div>`,
  iconSize:   [20, 20],
  iconAnchor: [10, 10],
});

// Driver — orange car emoji pill
export const driverIcon = L.divIcon({
  className: '',
  html: `<div style="background:white;border:2px solid #f97316;border-radius:20px;padding:4px 8px;font-size:16px;box-shadow:0 2px 8px rgba(249,115,22,.4);line-height:1;display:flex;align-items:center;justify-content:center">🚖</div>`,
  iconSize:   [44, 32],
  iconAnchor: [22, 16],
});

// Destination — red drop pin
export const destIcon = L.divIcon({
  className: '',
  html: `<div style="display:flex;flex-direction:column;align-items:center">
    <div style="background:#ef4444;width:28px;height:28px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 8px rgba(239,68,68,.5)"></div>
  </div>`,
  iconSize:   [28, 28],
  iconAnchor: [14, 28],
});