import React from "react";
import { Route } from "react-router-dom";
import { KundalisLoadingDialog } from "./kundalis-loading-dialog/KundalisLoadingDialog";
import { KundaliDeleteDialog } from "./kundali-delete-dialog/KundaliDeleteDialog";
import { KundalisDeleteDialog } from "./kundalis-delete-dialog/KundalisDeleteDialog";
import { KundalisFetchDialog } from "./kundalis-fetch-dialog/KundalisFetchDialog";
import { KundalisUpdateStatusDialog } from "./kundalis-update-status-dialog/KundalisUpdateStatusDialog";
import { KundalisCard } from "./KundalisCard";
import { KundalisUIProvider } from "./KundalisUIContext";

export function KundalisPage({ history }) {
  const kundalisUIEvents = {
    newKundaliButtonClick: () => {
      history.push("/astrology/kundalis/new");
    },
    openEditKundaliPage: (id) => {
      history.push(`/astrology/kundalis/${id}/edit`);
    },
    openDeleteKundaliDialog: (id) => {
      history.push(`/astrology/kundalis/${id}/delete`);
    },
    openDeleteKundalisDialog: () => {
      history.push(`/astrology/kundalis/deleteKundalis`);
    },
    openFetchKundalisDialog: () => {
      history.push(`/astrology/kundalis/fetch`);
    },
    openUpdateKundalisStatusDialog: () => {
      history.push("/astrology/kundalis/updateStatus");
    },
  };

  console.log(kundalisUIEvents)
  
  return (
    <KundalisUIProvider kundalisUIEvents={kundalisUIEvents}>
      <KundalisLoadingDialog />
      <Route path="/astrology/kundalis/deleteKundalis">
        {({ history, match }) => (
          <KundalisDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/astrology/kundalis");
            }}
          />
        )}
      </Route>
      <Route path="/astrology/kundalis/:id/delete">
        {({ history, match }) => (
          <KundaliDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/astrology/kundalis");
            }}
          />
        )}
      </Route>
      <Route path="/astrology/kundalis/fetch">
        {({ history, match }) => (
          <KundalisFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/astrology/kundalis");
            }}
          />
        )}
      </Route>
      <Route path="/astrology/kundalis/updateStatus">
        {({ history, match }) => (
          <KundalisUpdateStatusDialog
            show={match != null}
            onHide={() => {
              history.push("/astrology/kundalis");
            }}
          />
        )}
      </Route>
      <KundalisCard />
    </KundalisUIProvider>
  );
}
