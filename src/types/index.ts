export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export enum Users {
  ADMIN,
  TECH_LEAD,
  EMPLOYEE
}

export type Team = {
  id: number;
  name: string;
};

export type Department = {
  id: number;
  name: string;
};

export type ShiftSchedule = {
  id: number;
  fromTime: string;
  toTime: string;
}

export type HazardPay = {
  id: number;
  area: string;
  pay: number;
}