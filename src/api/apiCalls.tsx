import axios from "axios";
import {
  Client,
  DbClient,
  Address,
  NewClient,
  NewAddress,
  NewContactInfo,
  NewCaseInfo,
  EditClientName,
} from "../types";
import { EventType } from "../components/Calendar/CalendarTypes";
import camelcaseKeys from "camelcase-keys";

const REAL_BACKEND = "http://localhost:3003";
const MOCK_BACKEND = "http://localhost:3000";

const withCredentials = { withCredentials: true };

type RegisterUser = {
  email: string;
  password: string;
};

/**
 * INTERCEPTORS
 */
axios.interceptors.response.use(
  function (response) {
    // Convert keys from snake_case to camelCase
    if (response.data && response.headers["content-type"]?.includes("application/json")) {
      response.data = camelcaseKeys(response.data);
    }
    return response;
  },
  function (err) {
    // Redirect if token has expired
    if (err.response.status === 401 && err.response.data.error === "NO TOKEN") {
      window.location.href = "/login";
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);

/**
 * REGISTER USER
 */
export const registerUser = ({ email, password }: RegisterUser) => {
  return axios.post(`${REAL_BACKEND}/auth/register`, { email, password });
};

/**
 * LOG IN USER
 */
export const login = ({ email, password }: RegisterUser) => {
  return axios.post(`${REAL_BACKEND}/auth/login`, { email, password }, withCredentials);
};

/**
 * CHECK LOG IN STATUS
 */
export const whoAmI = () => {
  return axios.get(`${REAL_BACKEND}/auth/whoami`, withCredentials);
};

/**
 * LOG OUT USER
 */
export const logOut = () => {
  return axios.post(`${REAL_BACKEND}/auth/logout`, {}, withCredentials);
};

/**
 * CLIENT API CALLS
 */
export const getClients = (id: number) => {
  return axios.get(`${REAL_BACKEND}/client`, withCredentials);
};

export const getClient = (id: number) => {
  return axios.get<DbClient>(`${REAL_BACKEND}/client/${id}`, withCredentials);
};

export const addClient = (data: NewClient) => {
  return axios.post(`${REAL_BACKEND}/client`, data, withCredentials);
};

export const editClientName = (data: EditClientName) => {
  const { id } = data;
  return axios.put(`${REAL_BACKEND}/client/${id}`, data, withCredentials);
};

/**
 * ADDRESS API CALLS
 */
export const addAddress = (data: NewAddress) => {
  return axios.post(`${REAL_BACKEND}/address`, data, withCredentials);
};

export const getAddress = (id: number) => {
  return axios.get(`${REAL_BACKEND}/address/${id}`, withCredentials);
};

export const editAddress = (id: number, data: Address) => {
  return axios.put(`${REAL_BACKEND}/address/${id}`, data, withCredentials);
};

export const deleteAddress = (id: number) => {
  return axios.delete(`${REAL_BACKEND}/address/${id}`, withCredentials);
};

/**
 * CONTACT INFO API CALLS
 */
export const getContactInfo = (id: number) => {
  return axios.get(`${REAL_BACKEND}/contact/${id}`, withCredentials);
};

export const addContactInfo = (data: NewContactInfo) => {
  return axios.post(`${REAL_BACKEND}/contact`, data, withCredentials);
};

/**
 * NOTES API CALLS
 */
export const saveNote = (data: any) => {
  return axios.post(`${REAL_BACKEND}/note`, data, withCredentials);
};

export const getNotes = () => {
  return axios.get(`${REAL_BACKEND}/note`, withCredentials);
};

export const editNote = (id: number, data: any) => {
  return axios.put(`${REAL_BACKEND}/note/${id}`, data, withCredentials);
};

export const getNote = (id: number) => {
  return axios.get(`${REAL_BACKEND}/note/${id}`, withCredentials);
};

export const deleteNote = (id: number) => {
  return axios.delete(`${REAL_BACKEND}/note/${id}`, withCredentials);
};

/**
 * EVENTS API CALLS
 */
export const saveEvent = (data: EventType) => {
  return axios.post(`${REAL_BACKEND}/event`, data, withCredentials);
};

export const getEvents = () => {
  return axios.get(`${REAL_BACKEND}/event`, withCredentials);
};

export const getEvent = (id: number) => {
  return axios.get(`${REAL_BACKEND}/event/${id}`, withCredentials);
};

export const editEvent = (id: number, data: EventType) => {
  return axios.put(`${REAL_BACKEND}/event/${id}`, data, withCredentials);
};

export const deleteEvent = (id: number) => {
  return axios.delete(`${REAL_BACKEND}/event/${id}`, withCredentials);
};

/**
 * CASES API CALLS
 */
export const getCases = (clientId: number) => {
  return axios.get(`${REAL_BACKEND}/case/user/${clientId}`, withCredentials);
};

export const getCase = (id: number) => {
  return axios.get(`${REAL_BACKEND}/case/${id}`, withCredentials);
};

export const addCase = (data: NewCaseInfo) => {
  return axios.post(`${REAL_BACKEND}/case`, data, withCredentials);
};

/**
 * ACTIVITY API CALLS
 */
export const addCorrespondence = (id: number, data: any) => {
  return axios.post(`${REAL_BACKEND}/activity`, data, withCredentials);
};

export const getCorrespondence = (id: number) => {
  return axios.get(`${REAL_BACKEND}/activity/correspondence/${id}`);
};

export const getActivities = (id: number) => {
  return axios.get(`${MOCK_BACKEND}/activities?clientId=${id}`);
};
