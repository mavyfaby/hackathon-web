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