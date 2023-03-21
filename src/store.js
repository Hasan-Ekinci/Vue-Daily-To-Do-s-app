import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      counter: 0,
    };
  },
  mutations: {
    plusOne(state) {
      state.counter++;
    },
    plusCustom(state, payload) {
        state.counter = state.counter + payload
    }
  },
  actions: {
    increment(context) {
      context.commit("increment");
    },
  },
  getters: {
    counter(state) {
      return state.counter;
    },
  },
});

export default store;
