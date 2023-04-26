import { defineStore } from "pinia";

type DialogParam = { title : string, content: string, actions: Action[] };
type Action = { name: string, action: Function };

/**
 * Global store
 */
const useStore = defineStore("global", () => {
  const dark: boolean = false;

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
      open: false
    },
    department: {
      open: false
    },
    editDepartment: {
      open: false
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
    dark, dialog
  };
});

export {
  useStore
};