import axios from "axios";
import {
  Client,
  DbClient,
  Address,
  NewClient,
  NewAddress,
  NewContactInfo,
  NewCaseInfo,
} from "../types";
import { EventType } from "../components/Calendar/CalendarTypes";

const BASE_URL = "http://localhost:3000";
const REAL_BACKEND = "http://localhost:3003";

type RegisterUser = {
  email: string;
  password: string;
};

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
  return axios.post(
    `${REAL_BACKEND}/auth/login`,
    { email, password },
    { withCredentials: true }
  );
};

/**
 * CHECK LOG IN STATUS
 */
export const whoAmI = () => {
  return axios.get(`${REAL_BACKEND}/auth/whoami`, { withCredentials: true });
};

/**
 * CLIENT API CALLS
 */
export const getClients = (id: number) => {
  return axios.get<DbClient[]>(`${REAL_BACKEND}/client`, {
    withCredentials: true,
  });
};

export const getClient = (id: number) => {
  return axios.get<DbClient>(`${REAL_BACKEND}/client/${id}`, {
    withCredentials: true,
  });
};

export const addClient = (data: NewClient) => {
  console.log("API CALL FROM FRONT END SENDING");
  return axios.post(`${REAL_BACKEND}/client`, data, { withCredentials: true });
};

/**
 * ADDRESS API CALLS
 */
export const addAddress = (data: NewAddress) => {
  return axios.post(`${REAL_BACKEND}/address`, data, { withCredentials: true });
};

export const getAddress = (id: number) => {
  return axios.get(`${REAL_BACKEND}/address/${id}`, {
    withCredentials: true,
  });
};

/**
 * CONTACT INFO API CALLS
 */
export const getContactInfo = (id: number) => {
  return axios.get(`${REAL_BACKEND}/contact/${id}`, { withCredentials: true });
};

export const addContactInfo = (data: NewContactInfo) => {
  return axios.post(`${REAL_BACKEND}/contact`, data, { withCredentials: true });
};

/**
 * NOTES API CALLS
 */
export const saveNote = (data: any) => {
  return axios.post(`${REAL_BACKEND}/note`, data, { withCredentials: true });
};

export const getNotes = () => {
  return axios.get(`${REAL_BACKEND}/note`, { withCredentials: true });
};

export const editNote = (id: number, data: any) => {
  return axios.put(`${REAL_BACKEND}/note/${id}`, data, {
    withCredentials: true,
  });
};

export const getNote = (id: number) => {
  return axios.get(`${REAL_BACKEND}/note/${id}`, { withCredentials: true });
};

export const deleteNote = (id: number) => {
  return axios.delete(`${REAL_BACKEND}/note/${id}`, { withCredentials: true });
};

/**
 *
 *
 *
 * STILL NEED TO CONVERT TO REAL BACKEND
 *
 *
 */

/**
 * ACTIVITY API CALLS
 */
export const getActivities = (id: number) => {
  return axios.get(`${BASE_URL}/activities?clientId=${id}`);
};

/**
 * EVENTS API CALLS
 */
export const saveEvent = (data: EventType) => {
  return axios.post(`${REAL_BACKEND}/event`, data, { withCredentials: true });
};

export const getEvents = () => {
  return axios.get(`${REAL_BACKEND}/event`, { withCredentials: true });
};

export const getEvent = (id: number) => {
  return axios.get(`${REAL_BACKEND}/event/${id}`, { withCredentials: true });
};

export const editEvent = (id: number, data: EventType) => {
  return axios.put(`${REAL_BACKEND}/event/${id}`, data, {
    withCredentials: true,
  });
};

export const deleteEvent = (id: number) => {
  return axios.delete(`${REAL_BACKEND}/event/${id}`, { withCredentials: true });
};

/**
 * CASES API CALLS
 */
export const getCases = (id: number) => {
  return axios.get(`${BASE_URL}/case?clientId=${id}`);
};

export const getCase = (id: number) => {
  return axios.get(`${BASE_URL}/case/${id}`);
};

export const addCase = (data: NewCaseInfo) => {
  return axios.post(`${BASE_URL}/case`, data);
};
