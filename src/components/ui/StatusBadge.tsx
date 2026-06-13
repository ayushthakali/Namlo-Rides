import React from "react";
import { STATUS_LABELS, STATUS_COLORS } from "../../lib/constants";
import type { RideStatus } from "../../types";

interface Props {
  status: RideStatus;
}

export const StatusBadge: React.FC<Props> = React.memo(({ status }) => (
  <span
    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[status]}`}
  >
    {STATUS_LABELS[status]}
  </span>
));

StatusBadge.displayName = "StatusBadge";
