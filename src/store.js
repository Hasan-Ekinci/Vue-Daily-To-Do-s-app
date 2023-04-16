import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state() {
    return {
      counter: 0,
      userId: null,
      token: null,
      // tokenExpiration: null,
    };
  },
  mutations: {
    plusOne(state) {
      state.counter++;
    },
    plusCustom(state, payload) {
      state.counter = state.counter + payload;
    },
    setUser(state, payload) {
      state.userId = payload.userId;
      state.token = payload.token;
    },
  },
  actions: {
    increment(context) {
      context.commit("increment");
    },
    async login(context, payload) {
      await axios
        .post("http://127.0.0.1:8000/api/login", payload)
        .then((response) => {
          context.commit("setUser", response.data);
        })
        .catch((error) => {
          const newError = new Error(error.message || 'api error');
          throw newError;
        });
    },
  },
  getters: {
    counter(state) {
      return state.counter;
    },
    token(state) {
      return state.token;
    }
  },
});

export default store;
