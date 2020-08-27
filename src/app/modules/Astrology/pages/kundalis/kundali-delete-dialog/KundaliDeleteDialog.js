/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import * as actions from "../../../_redux/kundalis/kundalisActions";
import { useKundalisUIContext } from "../KundalisUIContext";

export function KundaliDeleteDialog({ id, show, onHide }) {
  // Kundalis UI Context
  const kundalisUIContext = useKundalisUIContext();
  const kundalisUIProps = useMemo(() => {
    return {
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

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteKundali = () => {
    // server request for deleting kundali by id
    dispatch(actions.deleteKundali(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchKundalis(kundalisUIProps.queryParams));
      // clear selections list
      kundalisUIProps.setIds([]);
      // closing delete modal
      onHide();
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Kundali Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this kundali?</span>
        )}
        {isLoading && <span>Kundali is deleting...</span>}
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
            onClick={deleteKundali}
            className="btn btn-delete btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
