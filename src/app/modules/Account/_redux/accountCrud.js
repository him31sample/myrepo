import axios from "axios";

export const ME_URL = process.env.REACT_APP_API_PROTOCOL + process.env.REACT_APP_API_ENDPOINT + "/api/v1/auth/users/me/";

// console.log("Printing Enviornment Variable")
// console.log(process.env.REACT_APP_API_ENDPOINT)
// console.log(process.env.REACT_APP_API_PROTOCOL)
// console.log(process.env.NODE_ENV)


export function fetchProfile() {
    return axios.get(ME_URL);
}

export function updateProfile(first_name, last_name, country, region, city) {
  return axios.put(ME_URL, {first_name, last_name, country, region, city});
}
