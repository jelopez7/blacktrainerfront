import axios from "axios";
import { BASE_PATH } from "../utils/constant";
import { getToken } from "../utils/token";

const baseURL = BASE_PATH;

const httpSinToken = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

const token = getToken() || "";

const httpConToken = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export { httpSinToken, httpConToken };
