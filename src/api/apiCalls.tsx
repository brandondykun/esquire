import axios from "axios";
import {
  Client,
  Address,
  NewClient,
  NewAddress,
  NewContactInfo,
  NewCaseInfo,
} from "../types";
import { EventType } from "../components/Calendar/CalendarTypes";

const BASE_URL = "http://localhost:3000";

// CLIENTS
export const getClients = () => {
  return axios.get<Client[]>(`${BASE_URL}/client`);
};

export const getClient = (id: number) => {
  return axios.get<Client>(`${BASE_URL}/client/${id}`);
};

export const addClient = (data: NewClient) => {
  return axios.post(`${BASE_URL}/client`, data);
};

// ADDRESS
export const addAddress = (data: NewAddress) => {
  return axios.post(`${BASE_URL}/address`, data);
};

export const getAddress = (id: number) => {
  return axios.get(`${BASE_URL}/address?clientId=${id}`);
};

// CASES
export const getCases = (id: number) => {
  return axios.get(`${BASE_URL}/case?clientId=${id}`);
};

export const getCase = (id: number) => {
  return axios.get(`${BASE_URL}/case/${id}`);
};

export const addCase = (data: NewCaseInfo) => {
  return axios.post(`${BASE_URL}/case`, data);
};

// CONTACT INFO
export const getContactInfo = (id: number) => {
  return axios.get(`${BASE_URL}/contactInfo?clientId=${id}`);
};

export const addContactInfo = (data: NewContactInfo) => {
  return axios.post(`${BASE_URL}/contactInfo`, data);
};

// Events
export const saveEvent = (data: EventType) => {
  return axios.post(`${BASE_URL}/event`, data);
};

export const getEvents = () => {
  return axios.get(`${BASE_URL}/event`);
};

export const editEvent = (id: number, data: EventType) => {
  return axios.put(`${BASE_URL}/event/${id}`, data);
};

export const deleteEvent = (id: number) => {
  return axios.delete(`${BASE_URL}/event/${id}`);
};

// NOTES
export const saveNote = (data: any) => {
  return axios.post(`${BASE_URL}/note`, data);
};

export const getNotes = () => {
  return axios.get(`${BASE_URL}/note`);
};

export const editNote = (id: number, data: any) => {
  return axios.put(`${BASE_URL}/note/${id}`, data);
};

export const getNote = (id: number) => {
  return axios.get(`${BASE_URL}/note/${id}`);
};

export const deleteNote = (id: number) => {
  return axios.delete(`${BASE_URL}/note/${id}`);
};
