import React, { useMemo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { RiderMarker, DriverMarker, DestMarker } from "./MapMarkers";
import { useAppSelector } from "../../store";
import { KATHMANDU, DEFAULT_ZOOM, RIDER_START } from "../../lib/constants";

const MapViewInner: React.FC = () => {
  const activeRide = useAppSelector((s) => s.ride.activeRide);
  const driverPresence = useAppSelector((s) => s.ride.driverPresence);
  const role = useAppSelector((s) => s.auth.user?.role);
  const isDriverOnline = driverPresence?.isOnline;
  const isRider = role === "rider";

  // useMemo — rider marker only recomputes when rider coords change
  const riderPos = useMemo(
    () => ({
      lat: activeRide?.pickupLat ?? RIDER_START[0],
      lng: activeRide?.pickupLng ?? RIDER_START[1],
    }),
    [activeRide?.pickupLat, activeRide?.pickupLng],
  );

  // useMemo — driver marker only recomputes when driver coords change
  const driverPos = useMemo(() => {
    const lat = activeRide?.driverLat ?? driverPresence?.lat ?? null;
    const lng = activeRide?.driverLng ?? driverPresence?.lng ?? null;
    if (!lat || !lng) return null;
    return { lat, lng };
  }, [
    activeRide?.driverLat,
    activeRide?.driverLng,
    driverPresence?.lat,
    driverPresence?.lng,
  ]);

  // useMemo — destination only recomputes when destination changes
  const destPos = useMemo(() => {
    if (!activeRide?.destLat) return null;
    return {
      lat: activeRide.destLat,
      lng: activeRide.destLng,
      address: activeRide.destAddress,
    };
  }, [activeRide]);

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden shadow-md">
      <MapContainer
        center={KATHMANDU}
        zoom={DEFAULT_ZOOM}
        className="h-full w-full"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* Only show rider location if requested state */}
        {(isRider || activeRide) && (
          <RiderMarker lat={riderPos.lat} lng={riderPos.lng} />
        )}
        {/* Rider Marker if offline for driver */}
        {driverPos && !isRider && !isDriverOnline && (
          <RiderMarker lat={driverPos.lat} lng={driverPos.lng} />
        )}
        {/* Only show driver marker when online */}
        {driverPos && isDriverOnline && (
          <DriverMarker lat={driverPos.lat} lng={driverPos.lng} />
        )}
        {destPos && (
          <DestMarker
            lat={destPos.lat}
            lng={destPos.lng}
            address={destPos.address}
          />
        )}
      </MapContainer>

      {/* Status pill floating over map */}
      {activeRide && activeRide.status !== "idle" && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-1000 pointer-events-none">
          <div className="bg-slate-800 text-white text-xs font-medium px-4 py-1.5 rounded-full shadow-lg">
            {{
              requested: "🔍 Finding your driver...",
              accepted: "✅ Driver accepted!",
              driver_arriving: "🚖 Driver on the way",
              in_progress: "🛣️ Ride in progress",
              completed: "🎉 You have arrived!",
              cancelled: "❌ Ride cancelled",
              rejected: "❌ Ride rejected",
            }[activeRide.status as string] ?? activeRide.status}
          </div>
        </div>
      )}
    </div>
  );
};

// map is expensive (Leaflet DOM manipulation)
export const MapView = React.memo(MapViewInner);
MapView.displayName = "MapView";
