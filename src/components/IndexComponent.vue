<template>
  <p>{{ counter }}</p>
  <button @click="plusOne">Doe plus 1</button>
  <button @click="plusTwo">Doe plus 2</button>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "IndexComponent",
  setup() {
    const store = useStore()

    const counter = computed(() => store.state.counter)

    function plusOne() {
      store.commit('plusOne')
    }

    function plusTwo() {
      store.commit('plusCustom', 2)
    }

    return {
      counter,
      plusOne,
      plusTwo
    };
  },
};
</script>
