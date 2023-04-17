import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state() {
    return {
      // userId: null,
      // token: null,
      // loggedIn: false,
      tasks: null,

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
      state.tasks = null;
    },
    setTasks(state, payload) {
      state.tasks = payload;
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
    async getAllTasks({ state, commit }) {
      await axios
        .get("http://127.0.0.1:8000/api/tasks/" + state.userId, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        })
        .then((response) => {
          commit("setTasks", response.data);
        })
        .catch((error) => {
          throw new Error(error.message || "Retrieving tasks failed")
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
    tasks(state) {
      return state.tasks;
    },
  },
});

export default store;
