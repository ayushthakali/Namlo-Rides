import { useAppSelector } from "../store";
import { MapView } from "../components/map/MapView";
import { RiderPanel } from "../components/RiderPanel";
import { DriverPanel } from "../components/DriverPanel";

export function DashboardPage() {
  const role = useAppSelector((s) => s.auth.user?.role);

  return (
    <div className="h-[calc(100vh-61.6px)] flex flex-col md:flex-row overflow-hidden">
      {/* Map */}
      <div className="flex-1 p-3 h-[50vh] md:h-full">
        <MapView />
      </div>

      {/* Role panel */}
      <div className="w-full md:w-80 md:max-w-sm border-t md:border-t-0 md:border-l border-slate-200 bg-white overflow-y-auto h-[50vh] md:h-full p-4">
        {role === "rider" && <RiderPanel />}
        {role === "driver" && <DriverPanel />}
      </div>
    </div>
  );
}

export default DashboardPage;
