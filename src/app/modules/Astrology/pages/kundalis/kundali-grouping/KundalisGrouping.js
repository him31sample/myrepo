import React, { useMemo } from "react";
import { useKundalisUIContext } from "../KundalisUIContext";

export function KundalisGrouping() {
  // Kundalis UI Context
  const kundalisUIContext = useKundalisUIContext();
  const kundalisUIProps = useMemo(() => {
    return {
      ids: kundalisUIContext.ids,
      setIds: kundalisUIContext.setIds,
      openDeleteKundalisDialog: kundalisUIContext.openDeleteKundalisDialog,
      openFetchKundalisDialog: kundalisUIContext.openFetchKundalisDialog,
      openUpdateKundalisStatusDialog:
        kundalisUIContext.openUpdateKundalisStatusDialog,
    };
  }, [kundalisUIContext]);

  return (
    <div className="form">
      <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
        <div className="col-xl-12">
          <div className="form-group form-group-inline">
            <div className="form-label form-label-no-wrap">
              <label className="-font-bold font-danger-">
                <span>
                  Selected records count: <b>{kundalisUIProps.ids.length}</b>
                </span>
              </label>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger font-weight-bolder font-size-sm"
                onClick={kundalisUIProps.openDeleteKundalisDialog}
              >
                <i className="fa fa-trash"></i> Delete All
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={kundalisUIProps.openFetchKundalisDialog}
              >
                <i className="fa fa-stream"></i> Fetch Selected
              </button>
              &nbsp;
              <button
                type="button"
                className="btn btn-light-primary font-weight-bolder font-size-sm"
                onClick={kundalisUIProps.openUpdateKundalisStatusDialog}
              >
                <i className="fa fa-sync-alt"></i> Update Status
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
