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
      axios.post(
        "http://127.0.0.1:8000/api/logout",
        {
          userId: state.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
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
          throw new Error(error.message || "Retrieving tasks failed");
        });
    },
    async addTask({ state, dispatch }, payload) {
      const data = {
        title: payload.title,
        description: payload.description,
        subTasks: payload.subTasks,
        userId: state.userId,
      };
      await axios
        .post("http://127.0.0.1:8000/api/add-task", data, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        })
        .then(() => {
          dispatch("getAllTasks");
        })
        .catch((error) => {
          throw new Error(error.message || "Adding task failed");
        });
    },
    async getTask({ state }, taskId) {
      let task = null;
      await axios
        .get("http://127.0.0.1:8000/api/task/" + state.userId + "/" + taskId, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        })
        .then((response) => {
          task = response.data;
        })
        .catch((error) => {
          throw new Error(error.message || "Retrieving task failed");
        });

      return task;
    },
    async saveEdit({ state }, payload) {
      let success = null;
      await axios
        .post("http://127.0.0.1:8000/api/edit", payload, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        })
        .then(() => {
          success = true;
        })
        .catch(() => {
          success = false;
        });

      return success;
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
