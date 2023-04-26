export const THEME_COLOR = "#3b82f6";

export const teams = [
  "Compliance Support",
  "Corporate",
  "Customer Support",
  "Data Analyst",
  "Finance",
  "Human Resource and Admin",
  "Information Technology",
  "Internal Sourcing",
  "IT BizOps Team",
  "IT Helpdesk Team",
  "IT Operations, Helpdesk Team",
  "IT SysOps Team"
];

export const departments = [
  "basta", "kani", "departments"
];

export const users = [
  {
    name: "Admin",
    username: "admin",
    type: "admin",
  },
  {
    name: "Tech Lead",
    username: "techlead",
    type: "techlead",
  },
  {
    name: "Employee",
    username: "employee",
    type: "employee",
  }
];

export const shiftScheds = [
  { from: '9:00AM', to: '6:00PM' },
  { from: '9:00PM', to: '6:00AM' },
  { from: '3:00PM', to: '12:00AM' },
  { from: '6:00PM', to: '3:00AM' },
];

export const admin = {
  features: [
    { name: "Users", path: "Users" },
    { name: "Department", path: "Departments" },
    { name: "Team", path: "Teams" },
    { name: "Shift Schedule", path: "Shift Schedule" },
    { name: "Employees", path: "/admin/employees" },
    { name: "Hybrid Schedule", path: "/admin/hybrid-schedule" },
    { name: "Hazard Pay Information", path: "/admin/hazard-pay" },
    { name: "Attendance Bonus Information", path: "/admin/attendance-bonus" },
    { name: "Paid Time Off (PTO) Information", path: "/admin/pto" },
  ]
};

export const techlead = {
  features: [

  ]
};