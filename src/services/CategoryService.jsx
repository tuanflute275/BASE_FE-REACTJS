import * as http from "../common/http-common";

const URLAPI = "http://localhost:8080";

export const findAll = async () => {
  try {
    const res = await http.get(`${URLAPI}/categories`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const findById = async (id) => {
  try {
    const res = await http.get(`${URLAPI}/categories/${id}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const search = async (keyword) => {
  try {
    const res = await http.get(`${URLAPI}/categories?key=${keyword}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const save = async (data) => {
  try {
    const res = await http.save(`${URLAPI}/categories`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const update = async (id, data) => {
  try {
    const res = await http.put(`${URLAPI}/categories/${id}`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const remove = async (id) => {
  try {
    const res = await http.remove(`${URLAPI}/categories/${id}`);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};
