export type Client = {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  };

export type NewClient = {
    firstName: string;
    middleName: string;
    lastName: string;
  };

export type Address = {
  id: number;
  clientId: number;
  street: string;
  city: string; 
  state: string; 
  zip: string
}

export type NewAddress ={
  clientId: number;
  street: string;
  city: string;
  state: string;
  zip: string
}

export type Case = {
  id: number;
  clientId: number;
  name: string;
  caseNumber: string;
  type: string;
}

export type NewCaseInfo = {
  clientId: number;
  name: string;
  caseNumber: string;
  type: string;
}

export type ContactInfo = {
  // id: number;
  // clientId: number;
  phone: string;
  email: string;
}

export type NewContactInfo = {
  clientId: number;
  phone: string;
  email: string;
}
