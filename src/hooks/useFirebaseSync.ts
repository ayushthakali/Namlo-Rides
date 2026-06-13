import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { off, onValue, ref, remove } from "firebase/database";
import { db } from "../lib/firebase";
import { FIREBASE_PATHS } from "../lib/constants";
import { setActiveRide, setDriverPresence } from "../store/rideSlice";
import type { ActiveRide, DriverPresence } from "../types";

const STALE_RIDE_TIMEOUT_MS = 2 * 60 * 1000;

export function useFirebaseSync(enabled: boolean) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!enabled) return;

    //ref->reference / pointer that tells Firebase where data is stored
    const rideRef = ref(db, FIREBASE_PATHS.ACTIVE_RIDE);
    const driverRef = ref(db, FIREBASE_PATHS.DRIVER_PRESENCE);

    //onValue->built-in listener that watches a specific ref and triggers an action every single time the data at that location changes. It instantly fires once to grab the current state of the data.
    onValue(rideRef, (snap) => {
      const ride = snap.val() as ActiveRide | null;
      dispatch(setActiveRide(ride));
      if (ride?.status === "requested") {
        const age = Date.now() - ride.requestedAt;
        if (age > STALE_RIDE_TIMEOUT_MS) {
          console.warn(
            "[useFirebaseSync] Stale ride detected — auto-cancelling",
          );
          remove(ref(db, FIREBASE_PATHS.ACTIVE_RIDE));
        }
      }
    });

    //snap-> snapshot is a secure Firebase object not raw JSON. so .val() extract actual data
    onValue(driverRef, (snap) => {
      dispatch(setDriverPresence(snap.val() as DriverPresence | null));
    });

    return () => {
      off(rideRef);
      off(driverRef);
    };
  }, [enabled, dispatch]);
}
