import {createSlice} from "@reduxjs/toolkit";

const initialKundalisState = {
  listLoading: false,
  actionsLoading: false,
  totalCount: 0,
  entities: null,
  kundaliForEdit: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const kundalisSlice = createSlice({
  name: "kundalis",
  initialState: initialKundalisState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getKundaliById
    kundaliFetched: (state, action) => {
      state.actionsLoading = false;
      state.kundaliForEdit = action.payload.kundaliForEdit;
      state.error = null;
    },
    // findKundalis
    kundalisFetched: (state, action) => {
      console.log("Kundali Slice - Kundali Fetched", action.payload);
      const { totalCount, entities } = action.payload;
      state.listLoading = false;
      state.error = null;
      state.entities = entities;
      state.totalCount = totalCount;
    },
    // createKundali
    kundaliCreated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      state.entities.push(action.payload.kundali);
    },
    // updateKundali
    kundaliUpdated: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.map(entity => {
        if (entity.id === action.payload.kundali.id) {
          return action.payload.kundali;
        }
        return entity;
      });
    },
    // deleteKundali
    kundaliDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(el => el.id !== action.payload.id);
    },
    // deleteKundalis
    kundalisDeleted: (state, action) => {
      state.error = null;
      state.actionsLoading = false;
      state.entities = state.entities.filter(
        el => !action.payload.ids.includes(el.id)
      );
    },
    // kundalisUpdateState
    kundalisStatusUpdated: (state, action) => {
      state.actionsLoading = false;
      state.error = null;
      const { ids, status } = action.payload;
      state.entities = state.entities.map(entity => {
        if (ids.findIndex(id => id === entity.id) > -1) {
          entity.status = status;
        }
        return entity;
      });
    }
  }
});
