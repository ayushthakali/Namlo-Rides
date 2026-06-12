import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { off, onValue, ref } from "firebase/database";
import { db } from "../lib/firebase";
import { FIREBASE_PATHS } from "../lib/constants";
import { setActiveRide, setDriverPresence } from "../store/rideSlice";
import type { ActiveRide, DriverPresence } from "../types";

export function useFirebaseSync(enabled: boolean) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!enabled) return;

    //ref->reference / pointer that tells Firebase where data is stored
    const rideRef = ref(db, FIREBASE_PATHS.ACTIVE_RIDE);
    const driverRef = ref(db, FIREBASE_PATHS.DRIVER_PRESENCE);

    //onValue->built-in listener that watches a specific ref and triggers an action every single time the data at that location changes. It instantly fires once to grab the current state of the data.
    onValue(rideRef, (snap) => {
      dispatch(setActiveRide(snap.val() as ActiveRide | null));
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
