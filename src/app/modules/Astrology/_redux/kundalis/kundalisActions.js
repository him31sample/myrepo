import * as requestFromServer from "./kundalisCrud";
import {kundalisSlice, callTypes} from "./kundalisSlice";

const {actions} = kundalisSlice;

export const fetchKundalis = queryParams => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  console.log(requestFromServer);
  return requestFromServer
    .findKundalis(queryParams)
    .then(response => {
      console.log("Kundali Actions");
      console.log(response.data);
      const { totalCount, entities } = response.data;
      dispatch(actions.kundalisFetched({ totalCount, entities }));
    })
    .catch(error => {
      console.log("Kundali Actions Errors");
      error.clientMessage = "Can't find kundalis";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchKundali = id => dispatch => {
  if (!id) {
    return dispatch(actions.kundaliFetched({ kundaliForEdit: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getKundaliById(id)
    .then(response => {
      const kundali = response.data;
      dispatch(actions.kundaliFetched({ kundaliForEdit: kundali }));
    })
    .catch(error => {
      error.clientMessage = "Can't find kundali";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteKundali = id => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteKundali(id)
    .then(response => {
      dispatch(actions.kundaliDeleted({ id }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete kundali";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createKundali = kundaliForCreation => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createKundali(kundaliForCreation)
    .then(response => {
      const { kundali } = response.data;
      dispatch(actions.kundaliCreated({ kundali }));
    })
    .catch(error => {
      error.clientMessage = "Can't create kundali";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateKundali = kundali => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateKundali(kundali)
    .then(() => {
      dispatch(actions.kundaliUpdated({ kundali }));
    })
    .catch(error => {
      error.clientMessage = "Can't update kundali";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateKundalisStatus = (ids, status) => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForKundalis(ids, status)
    .then(() => {
      dispatch(actions.kundalisStatusUpdated({ ids, status }));
    })
    .catch(error => {
      error.clientMessage = "Can't update kundalis status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteKundalis = ids => dispatch => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteKundalis(ids)
    .then(() => {
      dispatch(actions.kundalisDeleted({ ids }));
    })
    .catch(error => {
      error.clientMessage = "Can't delete kundalis";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
