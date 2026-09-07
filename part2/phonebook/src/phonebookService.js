import axios from "axios";

const url = "http://localhost:3001/persons";

export const getContacts = async () => {
  const result = await axios.get(url);
  return result.data;
};

export const addContact = async (data) => {
  const result = await axios.post(url, data);
  return result.data;
};

export const deleteContact = async (id) => {
  const result = await axios.delete(`${url}/${id}`);
  return result.data;
};

export const updateContact = async (data) => {
  const result = await axios.put(`${url}/${data.id}`, data);
  return result.data;
};

export default {
  getContacts,
  addContact,
  deleteContact,
  updateContact,
};
