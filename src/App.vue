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

:root {
  --white: #FFFDF7;
  --gray: #EFECE6;
  --black: #252422;
  --green: #99A810;
  --red: #eb5e28;
  --blue: #3394C1;
}

html {
  font-size: 62.5%;
}

body {
  background-color: var(--white);
  font-family: Verdana, sans-serif;
}
</style>
