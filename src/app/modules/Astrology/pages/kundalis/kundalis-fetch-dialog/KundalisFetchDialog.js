import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { KundaliStatusCssClasses } from "../KundalisUIHelpers";
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

export function KundalisFetchDialog({ show, onHide }) {
  // Kundalis UI Context
  const kundalisUIContext = useKundalisUIContext();
  const kundalisUIProps = useMemo(() => {
    return {
      ids: kundalisUIContext.ids,
      queryParams: kundalisUIContext.queryParams,
    };
  }, [kundalisUIContext]);

  // Kundalis Redux state
  const { Kundalis } = useSelector(
    (state) => ({
      Kundalis: selectedKundalis(state.entities, kundalisUIProps.ids),
    }),
    shallowEqual
  );

  // if there weren't selected ids we should close modal
  useEffect(() => {
    if (!kundalisUIProps.ids || kundalisUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kundalisUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="list-timeline list-timeline-skin-light padding-30">
          <div className="list-timeline-items">
            {Kundalis.map((kundali) => (
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
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
