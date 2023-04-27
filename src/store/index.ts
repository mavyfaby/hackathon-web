import type { Department, HazardPay, ShiftSchedule, Team } from "~/types";
import { defineStore } from "pinia";

type DialogParam = { title: string, content: string, actions: Action[] };
type SearchParam = { title: string, nameKey: string, valueKey: string, data: any[], callback: (item: any) => void };
type Action = { name: string, action: Function };

/**
 * Global store
 */
const useStore = defineStore("global", () => {
  const dark: boolean = false;
  const userId: number = -1;
  const appbarTitle: string = "Employee Tracker";
  const isFromLogout: boolean = false;
  const isLoggedIn: boolean = false;

  const dialog = {
    user: {
      open: false
    },
    editUser: {
      open: false
    },
    team: {
      open: false
    },
    editTeam: {
      open: false,
      team: {
        id: -1,
        name: ""
      } as Team
    },
    department: {
      open: false
    },
    editDepartment: {
      open: false,
      dept: {
        id: -1,
        name: ""
      } as Department
    },
    shiftSched: {
      open: false
    },
    editShiftSched: {
      sched: {
        id: -1,
        fromTime: "",
        toTime: "",
      } as ShiftSchedule,
      open: false
    },
    hazardPay: {
      open: false
    },
    editHazardPay: {
      open: false,
      pay: {
        id: -1,
        area: "",
        pay: 0,
      } as HazardPay,
    },
    bonus: {
      open: false
    },
    editBonus: {
      open: false
    },
    pto: {
      open: false
    },
    editPto: {
      open: false
    },
    session: {
      open: false
    },
    search: {
      isOpen: false,
      title: "",
      nameKey: "",
      valueKey: "",
      callback: (item: any) => {},
      data: <any>[],
      open(data: SearchParam) {
        this.nameKey = data.nameKey;
        this.valueKey = data.valueKey;
        this.title = data.title;
        this.data = data.data;
        this.callback = data.callback;
        this.isOpen = true;
      },
    },
    main: {
      isOpen: false,
      title: "",
      content: "",
      actions: [] as Action[], 
      open(data: DialogParam) {
        this.title = data.title;
        this.content = data.content;
        this.actions = data.actions;
        this.isOpen = true;
      },
      close() {
        this.isOpen = false;
      }
    },
  };

  return {
    dark, dialog, appbarTitle, isFromLogout, userId, isLoggedIn
  };
});

export {
  useStore
};