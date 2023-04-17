import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state() {
    return {
      // userId: null,
      // token: null,
      // loggedIn: false,
      userId: 1,
      token: null,
      loggedIn: true,
    };
  },
  mutations: {
    setUser(state, payload) {
      state.userId = payload.userId;
      state.token = payload.token;
      state.loggedIn = true;
    },
    logout(state) {
      state.userId = null;
      state.token = null;
      state.loggedIn = false;
    },
  },
  actions: {
    async login(context, payload) {
      await axios
        .post("http://127.0.0.1:8000/api/login", payload)
        .then((response) => {
          context.commit("setUser", response.data);
        })
        .catch((error) => {
          throw new Error(error.message || "API error");
        });
    },
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    loggedIn(state) {
      return state.loggedIn;
    },
  },
});

export default store;
