import axios from "axios";
import { USER_KEY, USER_SECRET } from "../constants";

export const wcInstance = axios.create();

wcInstance.interceptors.request.use(async (config) => {
  config.headers = {
    Authorization: `Basic ` + btoa(`${USER_KEY}:${USER_SECRET}`),
  };
  return config;
});
