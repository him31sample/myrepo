import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { KundaliStatusCssClasses } from "../KundalisUIHelpers";
import * as actions from "../../../_redux/kundalis/kundalisActions";
import { useKundalisUIContext } from "../KundalisUIContext";

const selectedKundalis = (entities, ids) => {
  const _kundalis = [];
  ids.forEach((id) => {
    const kundali = entities.find((el) => el.id === id);
    if (kundali) {
      _kundalis.push(kundali);
    }
  });
  return _kundalis;
};

export function KundalisUpdateStatusDialog({ show, onHide }) {
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
  const { kundalis, isLoading } = useSelector(
    (state) => ({
      kundalis: selectedKundalis(state.kundalis.entities, kundalisUIProps.ids),
      isLoading: state.kundalis.actionsLoading,
    }),
    shallowEqual
  );

  // if there weren't selected kundalis we should close modal
  useEffect(() => {
    if (kundalisUIProps.ids || kundalisUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kundalisUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for updateing kundali by ids
    dispatch(actions.updateKundalisStatus(kundalisUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchKundalis(kundalisUIProps.queryParams)).then(
          () => {
            // clear selections list
            kundalisUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected kundalis
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {isLoading && (
          <div className="overlay-layer bg-transparent">
            <div className="spinner spinner-lg spinner-warning" />
          </div>
        )}
        <div className="list-timeline list-timeline-skin-light padding-30">
          <div className="list-timeline-items">
            {kundalis.map((kundali) => (
              <div className="list-timeline-item mb-3" key={kundali.id}>
                <span className="list-timeline-text">
                  <span
                    className={`label label-lg label-light-${
                      KundaliStatusCssClasses[kundali.status]
                    } label-inline`}
                    style={{ width: "60px" }}
                  >
                    ID: {kundali.id}
                  </span>{" "}
                  <span className="ml-5">
                    {kundali.manufacture}, {kundali.model}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className={`form-control ${KundaliStatusCssClasses[status]}`}
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Selling</option>
            <option value="1">Sold</option>
          </select>
        </div>
        <div className="form-group">
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
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
