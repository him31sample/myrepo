/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/kundalis/kundalisActions";
import { useKundalisUIContext } from "../KundalisUIContext";

export function KundalisDeleteDialog({ show, onHide }) {
  // Kundalis UI Context
  const kundalisUIContext = useKundalisUIContext();
  const kundalisUIProps = useMemo(() => {
    return {
      ids: kundalisUIContext.ids,
      setIds: kundalisUIContext.setIds,
      queryParams: kundalisUIContext.queryParams,
    };
  }, [kundalisUIContext]);

  // Kundalis Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.kundalis.actionsLoading }),
    shallowEqual
  );

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  // if there weren't selected kundalis we should close modal
  useEffect(() => {
    if (!kundalisUIProps.ids || kundalisUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kundalisUIProps.ids]);

  const deleteKundalis = () => {
    // server request for deleting kundali by seleted ids
    dispatch(actions.deleteKundalis(kundalisUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchKundalis(kundalisUIProps.queryParams)).then(() => {
        // clear selections list
        kundalisUIProps.setIds([]);
        // closing delete modal
        onHide();
      });
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Kundalis Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected kundalis?</span>
        )}
        {isLoading && <span>Kundalis are deleting...</span>}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={deleteKundalis}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
