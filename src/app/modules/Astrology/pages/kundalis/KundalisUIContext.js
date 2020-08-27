import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./KundalisUIHelpers";

const KundalisUIContext = createContext();

export function useKundalisUIContext() {
  return useContext(KundalisUIContext);
}

export const KundalisUIConsumer = KundalisUIContext.Consumer;

export function KundalisUIProvider({ kundalisUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    newKundaliButtonClick: kundalisUIEvents.newKundaliButtonClick,
    openEditKundaliPage: kundalisUIEvents.openEditKundaliPage,
    openDeleteKundaliDialog: kundalisUIEvents.openDeleteKundaliDialog,
    openDeleteKundalisDialog: kundalisUIEvents.openDeleteKundalisDialog,
    openFetchKundalisDialog: kundalisUIEvents.openFetchKundalisDialog,
    openUpdateKundalisStatusDialog:
      kundalisUIEvents.openUpdateKundalisStatusDialog,
  };

  return (
    <KundalisUIContext.Provider value={value}>
      {children}
    </KundalisUIContext.Provider>
  );
}
