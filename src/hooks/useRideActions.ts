import { useCallback } from "react";
import { useAppSelector } from "../store";
import { useSaveRideHistoryMutation } from "../store/historyApi";
import type { ActiveRide } from "../types";
import {
  DESTINATIONS,
  DRIVER_START,
  FIREBASE_PATHS,
  RIDER_START,
  SIM_FARE,
} from "../lib/constants";
import { ref, remove, set, update } from "firebase/database";
import { db } from "../lib/firebase";

export function useRideActions() {
  const user = useAppSelector((s) => s.auth.user);
  const activeRide = useAppSelector((s) => s.ride.activeRide);
  const [saveRideHistory] = useSaveRideHistoryMutation();

  const saveAndClear = useCallback(
    async (
      ride: ActiveRide,
      finalStatus: "completed" | "cancelled" | "rejected",
    ) => {
      await saveRideHistory({
        rideId: ride.rideId,
        status: finalStatus,
        riderName: ride.riderName,
        driverName: ride.driverName ?? "N/A",
        pickupAddress: ride.pickupAddress,
        destAddress: ride.destAddress,
        fare: finalStatus === "completed" ? ride.fare : 0,
        requestedAt: new Date(ride.requestedAt).toISOString(),
        completedAt: new Date().toISOString(),
      });

      await remove(ref(db, FIREBASE_PATHS.ACTIVE_RIDE));
    },
    [saveRideHistory],
  );

  // Rider actions
  const requestRide = useCallback(
    async (destIndex: number) => {
      const dest = DESTINATIONS[destIndex];
      const ride: ActiveRide = {
        rideId: `ride_${Date.now()}`,
        status: "requested",
        requestedAt: Date.now(),
        updatedAt: Date.now(),
        riderName: user?.email ?? "Rider",
        driverName: null,
        pickupLat: RIDER_START[0],
        pickupLng: RIDER_START[1],
        pickupAddress: "Kathmandu Center",
        destLat: dest.lat,
        destLng: dest.lng,
        destAddress: dest.address,
        driverLat: null,
        driverLng: null,
        fare: SIM_FARE,
      };

      await set(ref(db, FIREBASE_PATHS.ACTIVE_RIDE), ride);
    },
    [user],
  );

  const cancelRide = useCallback(async () => {
    if (!activeRide) return;
    await saveAndClear(activeRide, "cancelled");
  }, [activeRide, saveAndClear]);

  //Driver Actions
  const goOnline = useCallback(async () => {
    await set(ref(db, FIREBASE_PATHS.DRIVER_PRESENCE), {
      isOnline: true,
      lat: DRIVER_START[0],
      lng: DRIVER_START[1],
      lastSeen: Date.now(),
    });
  }, []);

  const goOffline = useCallback(async () => {
    await set(ref(db, FIREBASE_PATHS.DRIVER_PRESENCE), {
      isOnline: false,
      lat: DRIVER_START[0],
      lng: DRIVER_START[1],
      lastSeen: Date.now(),
    });
  }, []);

  const acceptRide = useCallback(async () => {
    await update(ref(db, FIREBASE_PATHS.ACTIVE_RIDE), {
      status: "accepted",
      driverName: user?.email ?? "Driver",
      driverLat: DRIVER_START[0],
      driverLng: DRIVER_START[1],
      updatedAt: Date.now(),
    });
  }, [user]);

  const rejectRide = useCallback(async () => {
    if (!activeRide) return;
    await saveAndClear(activeRide, "rejected");
  }, [activeRide, saveAndClear]);

  const setArriving = useCallback(async () => {
    await update(ref(db, FIREBASE_PATHS.ACTIVE_RIDE), {
      status: "driver_arriving",
      updatedAt: Date.now(),
    });
  }, []);

  const startRide = useCallback(async () => {
    await update(ref(db, FIREBASE_PATHS.ACTIVE_RIDE), {
      status: "in_progress",
      updatedAt: Date.now(),
    });
  }, []);

  const completeRide = useCallback(async () => {
    if (!activeRide) return;
    await saveAndClear(activeRide, "completed");
  }, [activeRide, saveAndClear]);

  return {
    requestRide,
    cancelRide,
    goOnline,
    goOffline,
    acceptRide,
    rejectRide,
    setArriving,
    startRide,
    completeRide,
  };
}
