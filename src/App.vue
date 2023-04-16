<template>
  <!-- TO DO: maak navigation bar conditional, alleen voor ingelogde pagina's -->
  <NavigationBar v-if="loggedIn" />
  <router-view />
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "daily_to_do",
  components: {
    NavigationBar,
  },
  setup() {
    const store = useStore();

    const loggedIn = computed(() => store.state.loggedIn);

    return {
      loggedIn,
    };
  },
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
</style>
