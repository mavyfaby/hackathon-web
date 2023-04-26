export const THEME_COLOR = "#3b82f6";

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

export const hazardPayInfo = [
  { area: 'Area 1', rate: '50' },
  { area: 'Area 2', rate: '100' },
  { area: 'Area 3', rate: '150' },
  { area: 'Area 4', rate: '200' },
];

export const attendanceBonusInfo = [
  "1000"
];

export const ptoInfo = [
  "Unplanned Leave", "Planned Leave",
];

export const admin = {
  features: [
    "Users",
    "Departments",
    "Teams",
    "Shift Schedule",
    "Hybrid Schedule",
    "Hazard Pay Information",
    "Attendance Bonus Information",
    "Paid Time Off (PTO) Information"
  ]
};

export const techlead = {
  features: [

  ]
};