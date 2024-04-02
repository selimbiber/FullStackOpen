/* eslint-disable no-unused-vars */
import axios from "axios";

const baseUrl = "api/persons";

const getAll = () => {
  return axios.get(baseUrl).then((res) => res.data);
};
const create = (newPersonData) => {
  return axios.post(baseUrl, newPersonData).then((res) => res.data);
};
const update = (id, newPersonData) => {
  return axios.put(`${baseUrl}/${id}`, newPersonData).then((res) => res.data);
};
const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`).then((res) => res.data);
};

export default { getAll, create, update, remove };
