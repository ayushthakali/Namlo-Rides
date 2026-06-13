import React from "react";
import { Marker, Popup } from "react-leaflet";
import { riderIcon, driverIcon, destIcon } from "../../lib/leafletIcons";

interface RiderMarkerProps {
  lat: number;
  lng: number;
}
interface DriverMarkerProps {
  lat: number;
  lng: number;
}
interface DestMarkerProps {
  lat: number;
  lng: number;
  address: string;
}

export const RiderMarker: React.FC<RiderMarkerProps> = React.memo(
  ({ lat, lng }) => (
    <Marker position={[lat, lng]} icon={riderIcon}>
      <Popup>
        <span className="text-sm font-medium">🙋 Your location</span>
      </Popup>
    </Marker>
  ),
  (prev, next) => prev.lat === next.lat && prev.lng === next.lng,
);
RiderMarker.displayName = "RiderMarker";

export const DriverMarker: React.FC<DriverMarkerProps> = React.memo(
  ({ lat, lng }) => (
    <Marker position={[lat, lng]} icon={driverIcon}>
      <Popup>
        <span className="text-sm font-medium">🚖 Your driver</span>
      </Popup>
    </Marker>
  ),
  (prev, next) => prev.lat === next.lat && prev.lng === next.lng,
);
DriverMarker.displayName = "DriverMarker";

export const DestMarker: React.FC<DestMarkerProps> = React.memo(
  ({ lat, lng, address }) => (
    <Marker position={[lat, lng]} icon={destIcon}>
      <Popup>
        <div className="text-sm">
          <div className="font-semibold text-red-600">📍 Destination</div>
          <div className="text-slate-600">{address}</div>
        </div>
      </Popup>
    </Marker>
  ),
  (prev, next) =>
    prev.lat === next.lat &&
    prev.lng === next.lng &&
    prev.address === next.address,
);
DestMarker.displayName = "DestMarker";
