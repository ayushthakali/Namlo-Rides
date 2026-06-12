import type { RideStatus } from '../types';

export const CREDENTIALS = {
  email: 'intern@namlotech.com',
  password: 'namlo2026',
} as const;

// Default map center — Kathmandu
export const KATHMANDU: [number, number] = [27.7172, 85.324];
export const DEFAULT_ZOOM = 13;

// Driver starts slightly offset from center
export const DRIVER_START: [number, number] = [27.722, 85.318];
export const RIDER_START: [number, number]  = [27.7172, 85.324];

// Quick-pick destinations for rider
export const DESTINATIONS = [
  { address: 'Thamel, Kathmandu',            lat: 27.7172, lng: 85.3096 },
  { address: 'Patan Durbar Square',           lat: 27.6727, lng: 85.3248 },
  { address: 'Boudhanath Stupa',              lat: 27.7215, lng: 85.362  },
  { address: 'Pashupatinath Temple',          lat: 27.7105, lng: 85.3487 },
  { address: 'Swayambhunath (Monkey Temple)', lat: 27.7149, lng: 85.2903 },
  { address: 'Tribhuvan Airport',             lat: 27.6966, lng: 85.3591 },
] as const;

// Firebase paths
export const FB = {
  ACTIVE_RIDE:     'namlo-rides/active_ride',
  DRIVER_PRESENCE: 'namlo-rides/driver_presence',
} as const;

// Ride fare simulation
export const BASE_FARE    = 100;  // NPR
export const FARE_PER_KM  = 60;   // NPR per km
export const SIM_DISTANCE = 3.2;  // km (simulated)
export const SIM_FARE     = BASE_FARE + FARE_PER_KM * SIM_DISTANCE; // 292 NPR

// Status display labels
export const STATUS_LABELS: Record<RideStatus, string> = {
  idle:            'Available',
  requested:       'Finding Driver...',
  accepted:        'Driver Accepted',
  rejected:        'Ride Rejected',
  cancelled:       'Cancelled',
  driver_arriving: 'Driver Arriving',
  in_progress:     'Ride In Progress',
  completed:       'Completed',
};

// Status badge colors (Tailwind classes)
export const STATUS_COLORS: Record<RideStatus, string> = {
  idle:            'bg-gray-100 text-gray-600',
  requested:       'bg-yellow-100 text-yellow-700',
  accepted:        'bg-blue-100 text-blue-700',
  rejected:        'bg-red-100 text-red-700',
  cancelled:       'bg-red-100 text-red-700',
  driver_arriving: 'bg-purple-100 text-purple-700',
  in_progress:     'bg-green-100 text-green-700',
  completed:       'bg-emerald-100 text-emerald-700',
};