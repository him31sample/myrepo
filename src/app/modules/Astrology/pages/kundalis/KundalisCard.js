import React, {useMemo} from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { KundalisFilter } from "./kundali-filter/KundalisFilter";
import { KundalisTable } from "./kundalis-table/KundalisTable";
import { KundalisGrouping } from "./kundali-grouping/KundalisGrouping";
import { useKundalisUIContext } from "./KundalisUIContext";

export function KundalisCard() {
  const kundalisUIContext = useKundalisUIContext();
  const kundalisUIProps = useMemo(() => {
    return {
      ids: kundalisUIContext.ids,
      queryParams: kundalisUIContext.queryParams,
      setQueryParams: kundalisUIContext.setQueryParams,
      newKundaliButtonClick: kundalisUIContext.newKundaliButtonClick,
      openDeleteKundalisDialog: kundalisUIContext.openDeleteKundalisDialog,
      openEditKundaliPage: kundalisUIContext.openEditKundaliPage,
      openUpdateKundalisStatusDialog:
        kundalisUIContext.openUpdateKundalisStatusDialog,
      openFetchKundalisDialog: kundalisUIContext.openFetchKundalisDialog,
    };
  }, [kundalisUIContext]);

  return (
    <Card>
      <CardHeader title="Kundalis list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={kundalisUIProps.newKundaliButtonClick}
          >
            New Kundali
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <KundalisFilter />
        {kundalisUIProps.ids.length > 0 && (
          <>
            <KundalisGrouping />
          </>
        )}
        <KundalisTable />
      </CardBody>
    </Card>
  );
}
