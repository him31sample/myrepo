import axios from "axios";

export const LOGIN_URL = "http://127.0.0.1:8000/api/v1/auth/jwt/create/";
export const REGISTER_URL = "http://127.0.0.1:8000/api/v1/auth/users/";
export const REQUEST_PASSWORD_URL = "api/auth/forgot-password";

export const ME_URL = "http://127.0.0.1:8000/api/v1/auth/users/me/";

export function login(email, password) {
  console.log(email, password, LOGIN_URL)
  console.log(axios.post(LOGIN_URL, {email, password }))
  return axios.post(LOGIN_URL, {email, password });
}

export function register(first_name, last_name, email, password) {
  console.log(first_name, last_name, email, password)
  return axios.post(REGISTER_URL, {first_name, last_name, email, password});
}

export function requestPassword(email) {
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  return axios.get(ME_URL);
}
