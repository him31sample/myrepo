import axios from "axios";

export const PRODUCTS_URL = "api/kundalis";

// CREATE =>  POST: add a new kundali to the server
export function createKundali(kundali) {
  return axios.post(PRODUCTS_URL, { kundali });
}

// READ
export function getAllKundalis() {
  return axios.get(PRODUCTS_URL);
}

export function getKundaliById(kundaliId) {
  return axios.get(`${PRODUCTS_URL}/${kundaliId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findKundalis(queryParams) {
  return axios.post(`${PRODUCTS_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the procuct on the server
export function updateKundali(kundali) {
  return axios.put(`${PRODUCTS_URL}/${kundali.id}`, { kundali });
}

// UPDATE Status
export function updateStatusForKundalis(ids, status) {
  return axios.post(`${PRODUCTS_URL}/updateStatusForKundalis`, {
    ids,
    status
  });
}

// DELETE => delete the kundali from the server
export function deleteKundali(kundaliId) {
  return axios.delete(`${PRODUCTS_URL}/${kundaliId}`);
}

// DELETE Kundalis by ids
export function deleteKundalis(ids) {
  return axios.post(`${PRODUCTS_URL}/deleteKundalis`, { ids });
}
