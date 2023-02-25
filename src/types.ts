export type Client = {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  caseCount: string;
};

export type DbClient = {
  id: number;
  first_name: string;
  middle_name: string;
  last_name: string;
  user_id: number;
  case_count: string;
};

export type NewClient = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type EditClientName = {
  id: number;
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

export type DbAddress = {
  id: number;
  client_id: number;
  street: string;
  city: string; 
  state: string; 
  zip: string
}

export type NewAddress = {
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
  clientId: number;
  phone: string;
  email: string;
}

export type NewContactInfo = {
  clientId: number;
  phone: string;
  email: string;
}

export type Activity = {
  id: number;
  type: "filing" | "correspondence" | "phoneEmail" | "courtAppearance" | "meeting";
  data: Filing | Correspondence | PhoneEmail | CourtAppearance | Meeting;
  clientId: number;
}

export type Filing = {
  id: number;
  date: Date;
  type: string;
  filedBy: string;
  deadline: Date | null;
  comments: string;
}

export type Correspondence = {
  id: number;
  date: Date;
  inOut: "incoming" | "outgoing";
  name: string;
  partyType: string;
  deadline: Date | null;
}

export type PhoneEmail = {
  id: number;
  date: Date;
  inOut: "incoming" | "outgoing";
  name: string;
  partyType: string;
  deadline: Date | null;
  duration: number;
}

export type CourtAppearance = {
  id: number;
  date: Date;
  county: string;
  duration: number;
  deadline: Date | null;
  comments: string;
}

export type Meeting = {
  id: number;
  date: Date;
  duration: number;
  name: string;
  partyType: string;
  comments: string;
}
