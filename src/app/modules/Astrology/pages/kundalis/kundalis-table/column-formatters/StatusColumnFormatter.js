import React from "react";
import {
  KundaliStatusCssClasses,
  KundaliStatusTitles
} from "../../KundalisUIHelpers";

export const StatusColumnFormatter = (cellContent, row) => (
  <span
    className={`label label-lg label-light-${
      KundaliStatusCssClasses[row.status]
    } label-inline`}
  >
    {KundaliStatusTitles[row.status]}
  </span>
);
