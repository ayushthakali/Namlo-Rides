// RiderPanel — state-driven UI.
// Each ride status shows different content.
// useCallback on handlers = stable references = no unnecessary child re-renders.

import { useState, useCallback, useMemo } from "react";
import { useAppSelector } from "../store";
import { useRideActions } from "../hooks/useRideActions";
import { Button } from "./ui/Button";
import { StatusBadge } from "./ui/StatusBadge";
import { DESTINATIONS } from "../lib/constants";

export function RiderPanel() {
  const activeRide = useAppSelector((s) => s.ride.activeRide);
  const status = activeRide?.status ?? "idle";
  const actions = useRideActions();

  const [destIndex, setDestIndex] = useState(0);
  const [requesting, setRequesting] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const handleRequest = useCallback(async () => {
    setRequesting(true);
    await actions.requestRide(destIndex);
    setRequesting(false);
  }, [actions, destIndex]);

  const handleCancel = useCallback(async () => {
    setCancelling(true);
    await actions.cancelRide();
    setCancelling(false);
  }, [actions]);

  // useMemo — only recomputes when activeRide changes, not on every render
  const fareDisplay = useMemo(
    () => (activeRide ? `Rs. ${activeRide.fare.toFixed(0)}` : ""),
    [activeRide?.fare],
  );

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Rider</h2>
          <p className="text-xs text-slate-400">Request and track your ride</p>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* IDLE — pick destination and request */}
      {status === "idle" && (
        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Where to?
            </label>
            <select
              value={destIndex}
              onChange={(e) => setDestIndex(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm
                         focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              {DESTINATIONS.map((d, i) => (
                <option key={i} value={i}>
                  {d.address}
                </option>
              ))}
            </select>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Estimated fare</span>
              <span className="font-semibold">
                Rs. {DESTINATIONS[destIndex] ? "292" : "—"}
              </span>
            </div>
          </div>
          <Button onClick={handleRequest} loading={requesting} full>
            🙋 Request Ride
          </Button>
        </div>
      )}

      {/* REQUESTED — waiting */}
      {status === "requested" && (
        <div className="flex flex-col gap-3">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">🔍</div>
            <p className="text-sm font-medium text-yellow-800">
              Looking for a driver...
            </p>
            <p className="text-xs text-yellow-600 mt-1">
              This may take a moment
            </p>
          </div>
          <div className="text-sm text-slate-600 bg-slate-50 rounded-lg p-3">
            <div className="flex justify-between mb-1">
              <span className="text-slate-400">Destination</span>
              <span className="font-medium">{activeRide?.destAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Fare</span>
              <span className="font-medium">{fareDisplay}</span>
            </div>
          </div>
          <Button
            variant="danger"
            onClick={handleCancel}
            loading={cancelling}
            full
          >
            Cancel Ride
          </Button>
        </div>
      )}

      {/* ACCEPTED */}
      {status === "accepted" && (
        <div className="flex flex-col gap-3">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">✅</div>
            <p className="text-sm font-medium text-blue-800">
              Driver accepted your ride!
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Driver: {activeRide?.driverName}
            </p>
          </div>
          <Button
            variant="danger"
            onClick={handleCancel}
            loading={cancelling}
            full
          >
            Cancel Ride
          </Button>
        </div>
      )}

      {/* DRIVER ARRIVING */}
      {status === "driver_arriving" && (
        <div className="flex flex-col gap-3">
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">🚖</div>
            <p className="text-sm font-medium text-purple-800">
              Driver is on the way!
            </p>
            <p className="text-xs text-purple-600 mt-1">
              Please be ready at pickup
            </p>
          </div>
          <Button
            variant="danger"
            onClick={handleCancel}
            loading={cancelling}
            full
          >
            Cancel Ride
          </Button>
        </div>
      )}

      {/* IN PROGRESS */}
      {status === "in_progress" && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">🛣️</div>
          <p className="text-sm font-medium text-green-800">Ride in progress</p>
          <p className="text-xs text-green-600 mt-1">
            Heading to {activeRide?.destAddress}
          </p>
        </div>
      )}

      {/* COMPLETED */}
      {status === "completed" && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">🎉</div>
          <p className="text-sm font-medium text-emerald-800">
            You've arrived!
          </p>
          <p className="text-xs text-emerald-600 mt-1">Fare: {fareDisplay}</p>
        </div>
      )}

      {/* CANCELLED / REJECTED */}
      {(status === "cancelled" || status === "rejected") && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">❌</div>
          <p className="text-sm font-medium text-red-800">
            {status === "cancelled"
              ? "Ride cancelled"
              : "Ride rejected by driver"}
          </p>
          <p className="text-xs text-red-600 mt-1">
            You can request a new ride
          </p>
        </div>
      )}
    </div>
  );
}
