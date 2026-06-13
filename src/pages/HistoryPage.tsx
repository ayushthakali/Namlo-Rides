// RTK Query's useGetHistoryQuery handles:
//   - the fetch itself
//   - isLoading / isError states
//   - caching (won't refetch if data is fresh)
//   - auto-refetch after saveHistory mutation (via tag invalidation)
// No manual useState, no useEffect, no fetch() needed.

import { useGetRideHistoryQuery } from "../store/historyApi";

export default function HistoryPage() {
  const {
    data: history,
    isLoading,
    isError,
    refetch,
  } = useGetRideHistoryQuery();

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-2">
          <div className="animate-spin text-3xl">⏳</div>
          <p className="text-slate-500 text-sm">Loading history...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center space-y-3">
          <div className="text-3xl">❌</div>
          <p className="text-slate-600 text-sm">Failed to load ride history.</p>
          <button
            onClick={refetch}
            className="text-sky-600 text-sm hover:underline"
          >
            Try again
          </button>
        </div>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Ride History</h1>

      {!history?.length ? (
        <div className="text-center py-16 text-slate-400">
          <div className="text-5xl mb-3">📋</div>
          <p className="font-medium">No rides yet</p>
          <p className="text-sm mt-1">Completed rides will appear here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((ride) => (
            <div
              key={ride.id}
              className="bg-white rounded-xl p-4 shadow-sm border border-slate-100"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-slate-800 text-sm">
                    {ride.pickupAddress} → {ride.destAddress}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {new Date(ride.completedAt).toLocaleString()}
                  </p>
                </div>
                <span
                  className={[
                    "text-xs font-semibold px-2.5 py-1 rounded-full",
                    ride.status === "completed"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-red-100 text-red-700",
                  ].join(" ")}
                >
                  {ride.status === "completed"
                    ? "✅ Completed"
                    : `❌ ${ride.status}`}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-500 mt-2 pt-2 border-t border-slate-50">
                <span>👤 {ride.riderName}</span>
                <span>🚖 {ride.driverName}</span>
                {ride.status === "completed" && (
                  <span className="ml-auto font-semibold text-slate-700">
                    Rs. {ride.fare}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
