import React from "react";
import {
  KundaliConditionCssClasses,
  KundaliConditionTitles
} from "../../KundalisUIHelpers";

export const ConditionColumnFormatter = (cellContent, row) => (
  <>
    <span
      className={`badge badge-${
        KundaliConditionCssClasses[row.condition]
      } badge-dot`}
    ></span>
    &nbsp;
    <span
      className={`font-bold font-${
        KundaliConditionCssClasses[row.condition]
      }`}
    >
      {KundaliConditionTitles[row.condition]}
    </span>
  </>
);
