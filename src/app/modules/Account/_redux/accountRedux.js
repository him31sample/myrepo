import {createReducer} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { put, takeLatest } from "redux-saga/effects";



export const actionTypes = {
    // VerifyPhone: "[VerifyPhone] Action",
    UpdateProfile: "[UpdateProfile] Action",
    FetchProfile: "[FetchProfile] Action",
    // UpdateEmail: "[UpdateEmail] Action",
    // UpdateUsername: "[UpdateUsername] Auth API",
    // ChangePassword: "[ChangePassword] Auth API",
    // DeactivateAccount: "[DeactivateAccount] Auth API",
};

const initialAccountState = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    username: "",
    country: "",
    region: "",
    city: "",
    phone_verified: "",
    email_verified: "",
};


export const reducer = createReducer(
    (state = initialAccountState, action) => {
      switch (action.type) {
        case actionTypes.UpdateProfile: {
          const { first_name } = action.payload.first_name;
          return {...state };
        }
  
        case actionTypes.FetchProfile: {
          return state;
        }
  
        default:
          // console.log("Defalt State")
          // console.log(state)
          return state;
      }
    }
);



export const actions = {
    // verifyPhone: (user) => ({ type: actionTypes.VerifyPhone, payload: { user } }),
    updateProfile: (user) => ({type: actionTypes.UpdateProfile, payload: { user } }),
    fetchProfile: () => ({ type: actionTypes.FetchProfile }),
    // updateEmail: (user) => ({type: actionTypes.UpdateEmail, payload: { user } }),
    // updateUsername: (user) => ({ type: actionTypes.UpdateUsername, payload: { user } }),
    // changePassword: (user) => ({ type: actionTypes.ChangePassword, payload: { user } }),
    // deactivateAccount: (user) => ({ type: actionTypes.DeactivateAccount, payload: { user } }),
};
