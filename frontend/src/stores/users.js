import { defineStore } from "pinia";

export default defineStore("users", {
  state: () => {
    return {
      accessToken: "",
      refreshToken: "",
      showCookies: localStorage.getItem("showCookies")
        ? localStorage.getItem("showCookies")
        : "true",
      allowCookies: localStorage.getItem("cookies"),
    };
  },
  actions: {
    recalculateShowCookies() {
      this.$state.showCookies = localStorage.getItem("showCookies")
        ? localStorage.getItem("showCookies")
        : "true";
    },
    setTokens(tokens) {
      this.$state.accessToken = tokens.accessToken;
      this.$state.refreshToken = tokens.refreshToken;
    },
    verifyShowCookies() {
      if (!localStorage.getItem("cookies"))
        localStorage.setItem("showCookies", true);
      else localStorage.setItem("showCookies", false);
    },
    acceptCookies() {
      localStorage.setItem("cookies", true);
      localStorage.setItem("showCookies", false);
      this.recalculateShowCookies();
    },
    rejectCookies() {
      localStorage.setItem("cookies", false);
      localStorage.setItem("showCookies", false);
      this.recalculateShowCookies();
    },
  },
});
