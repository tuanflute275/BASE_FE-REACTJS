import * as http from "../common/http-common";

const URLAPI = "http://localhost:8080";

export const login = async (data) => {
  try {
    const res = await http.save(`${URLAPI}/login`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};

export const register = async (data) => {
  try {
    const res = await http.save(`${URLAPI}/registerNewUser`, data);
    return [res, null];
  } catch (error) {
    return [null, error];
  }
};
