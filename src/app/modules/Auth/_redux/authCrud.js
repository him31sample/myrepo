import axios from "axios";

export const LOGIN_URL = process.env.REACT_APP_API_PROTOCOL + process.env.REACT_APP_API_ENDPOINT + "/api/v1/auth/jwt/create/";
export const REGISTER_URL = process.env.REACT_APP_API_PROTOCOL + process.env.REACT_APP_API_ENDPOINT + "/api/v1/auth/users/";
export const RESET_PASSWORD_URL = process.env.REACT_APP_API_PROTOCOL + process.env.REACT_APP_API_ENDPOINT + "/api/v1/auth/users/reset_password/";
export const RESET_PASSWORD_CONFIRM_URL = process.env.REACT_APP_API_PROTOCOL + process.env.REACT_APP_API_ENDPOINT + "/api/v1/auth/users/reset_password_confirm/";
export const ME_URL = process.env.REACT_APP_API_PROTOCOL + process.env.REACT_APP_API_ENDPOINT + "/api/v1/auth/users/me/";

// console.log("Printing Enviornment Variable")
// console.log(process.env.REACT_APP_API_ENDPOINT)
// console.log(process.env.REACT_APP_API_PROTOCOL)
// console.log(process.env.NODE_ENV)


export function login(email, password) {
  return axios.post(LOGIN_URL, {email, password });
}

export function register(first_name, last_name, email, password) {
  return axios.post(REGISTER_URL, {first_name, last_name, email, password});
}

export function resetPassword(email) {
  return axios.post(RESET_PASSWORD_URL, { email });
}

export function resetPasswordConfirm(uid, token, new_password) {
  return axios.post(RESET_PASSWORD_CONFIRM_URL, { uid, token, new_password});
}

export function updateProfile(first_name, last_name, country, region, city) {
  return axios.post(ME_URL, {first_name, last_name, country, region, city});
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
