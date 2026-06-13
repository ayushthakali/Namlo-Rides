import { useState, useCallback } from "react";
import { useAppSelector } from "../store";
import { useRideActions } from "../hooks/useRideActions";
import { Button } from "./ui/Button";
import { StatusBadge } from "./ui/StatusBadge";
export function DriverPanel() {
  const activeRide = useAppSelector((s) => s.ride.activeRide);
  const driverPresence = useAppSelector((s) => s.ride.driverPresence);
  const status = activeRide?.status ?? "idle";
  const isOnline = driverPresence?.isOnline ?? false;
  const actions = useRideActions();

  const [toggling, setToggling] = useState(false);
  const [accepting, setAccepting] = useState(false);
  const [rejecting, setRejecting] = useState(false);
  const [arriving, setArriving] = useState(false);
  const [starting, setStarting] = useState(false);
  const [completing, setCompleting] = useState(false);

  const handleToggleOnline = useCallback(async () => {
    setToggling(true);
    if (isOnline) {
      await actions.goOffline();
    } else {
      await actions.goOnline();
    }
    setToggling(false);
  }, [isOnline, actions]);

  const handleAccept = useCallback(async () => {
    setAccepting(true);
    await actions.acceptRide();
    setAccepting(false);
  }, [actions]);

  const handleReject = useCallback(async () => {
    setRejecting(true);
    await actions.rejectRide();
    setRejecting(false);
  }, [actions]);

  const handleArriving = useCallback(async () => {
    setArriving(true);
    await actions.setArriving();
    setArriving(false);
  }, [actions]);

  const handleStart = useCallback(async () => {
    setStarting(true);
    await actions.startRide();
    setStarting(false);
  }, [actions]);

  const handleComplete = useCallback(async () => {
    setCompleting(true);
    await actions.completeRide();
    setCompleting(false);
  }, [actions]);

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Driver</h2>
          <p className="text-xs text-slate-400">Manage incoming rides</p>
        </div>
        <StatusBadge status={status} />
      </div>

      {/* Online toggle*/}
      <button
        onClick={handleToggleOnline}
        disabled={toggling || (status !== "idle" && isOnline)}
        className={[
          "w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-colors",
          isOnline
            ? "border-green-400 bg-green-50 text-green-700"
            : "border-slate-300 bg-slate-50 text-slate-600",
          toggling || (status !== "idle" && isOnline)
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer",
        ].join(" ")}
      >
        <span className="font-medium text-sm">
          {isOnline ? "● Online — accepting rides" : "○ Offline"}
        </span>
        <span
          className={[
            "w-10 h-6 rounded-full transition-colors relative",
            isOnline ? "bg-green-500" : "bg-slate-300",
          ].join(" ")}
        >
          <span
            className={[
              "absolute top-1 left-0 w-4 h-4 rounded-full bg-white shadow transition-transform",
              isOnline ? "translate-x-5" : "translate-x-1",
            ].join(" ")}
          />
        </span>
      </button>

      {/* Idle State */}
      {status === "idle" && isOnline && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center overflow-hidden">
          <div className="text-3xl mb-2 animate-spin">⏳</div>
          <p className="text-sm font-medium text-slate-600">
            Waiting for a ride request...
          </p>
        </div>
      )}

      {/* Requested State */}
      {status === "requested" && (
        <div className="flex flex-col gap-3">
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-xl p-4">
            <p className="text-sm font-bold text-yellow-800 mb-2">
              🔔 New Ride Request!
            </p>
            <div className="text-xs text-slate-600 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Rider</span>
                <span className="font-medium">{activeRide?.riderName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Pickup</span>
                <span className="font-medium">{activeRide?.pickupAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Destination</span>
                <span className="font-medium">{activeRide?.destAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Fare</span>
                <span className="font-medium text-green-600">
                  Rs. {activeRide?.fare.toFixed(0)}
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button
              onClick={handleReject}
              variant="danger"
              loading={rejecting}
              full
            >
              Reject
            </Button>
            <Button onClick={handleAccept} loading={accepting} full>
              Accept ✓
            </Button>
          </div>
        </div>
      )}

      {/* Accepted State*/}
      {status === "accepted" && (
        <div className="flex flex-col gap-3">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">🗺️</div>
            <p className="text-sm font-medium text-blue-800">
              Navigate to pickup
            </p>
            <p className="text-xs text-blue-600 mt-1">
              {activeRide?.pickupAddress}
            </p>
          </div>
          <Button onClick={handleArriving} loading={arriving} full>
            I've Arrived at Pickup 📍
          </Button>
        </div>
      )}

      {/* Driver Arriving State*/}
      {status === "driver_arriving" && (
        <div className="flex flex-col gap-3">
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">📍</div>
            <p className="text-sm font-medium text-purple-800">
              At pickup location
            </p>
            <p className="text-xs text-purple-600 mt-1">
              Waiting for rider to board
            </p>
          </div>
          <Button onClick={handleStart} loading={starting} full>
            Start Ride 🛣️
          </Button>
        </div>
      )}

      {/* In progress State */}
      {status === "in_progress" && (
        <div className="flex flex-col gap-3">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">🛣️</div>
            <p className="text-sm font-medium text-green-800">
              Ride in progress
            </p>
            <p className="text-xs text-green-600 mt-1">
              To: {activeRide?.destAddress}
            </p>
          </div>
          <Button onClick={handleComplete} loading={completing} full>
            Complete Ride 🎉
          </Button>
        </div>
      )}

      {/* Terminal states — brief feedback */}
      {(status === "completed" ||
        status === "cancelled" ||
        status === "rejected") && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
          <div className="text-3xl mb-2">
            {status === "completed" ? "🎉" : "❌"}
          </div>
          <p className="text-sm font-medium text-slate-700 capitalize">
            {status}
          </p>
          <p className="text-xs text-slate-400 mt-1 ">
            Waiting for next request...
          </p>
        </div>
      )}
    </div>
  );
}
