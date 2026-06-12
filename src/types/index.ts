export type UserRole = "rider" | "driver";

export type RideStatus =
  | "idle"
  | "requested"
  | "accepted"
  | "rejected"
  | "cancelled"
  | "driver_arriving"
  | "in_progress"
  | "completed";

export interface AuthUser {
  email: string;
  role: UserRole;
}

export interface LatLng {
  lat: number;
  lng: number;
}

// Shape stored in Firebase at: namlo-rides/active_ride
export interface ActiveRide {
  rideId: string;
  status: RideStatus;
  requestedAt: number;
  updatedAt: number;
  riderName: string;
  driverName: string | null;
  pickupLat: number;
  pickupLng: number;
  pickupAddress: string;
  destLat: number;
  destLng: number;
  destAddress: string;
  driverLat: number | null;
  driverLng: number | null;
  fare: number;
}

// Shape stored in Firebase at: namlo-rides/driver_presence
export interface DriverPresence {
  isOnline: boolean;
  lat: number;
  lng: number;
  lastSeen: number;
}

// Shape POSTed to MockAPI
export interface RideHistoryRecord {
  id?: string;
  rideId: string;
  status: "completed" | "cancelled" | "rejected";
  riderName: string;
  driverName: string;
  pickupAddress: string;
  destAddress: string;
  fare: number;
  requestedAt: string;
  completedAt: string;
  createdAt?: string;
}
