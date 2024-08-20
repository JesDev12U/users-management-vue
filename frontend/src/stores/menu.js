import { defineStore } from "pinia";

export default defineStore("menu", {
  state: () => ({
    showMainMenu: true,
  }),
  actions: {
    setValueShowMainMenu(value) {
      this.$state.showMainMenu = value;
    },
  },
});
