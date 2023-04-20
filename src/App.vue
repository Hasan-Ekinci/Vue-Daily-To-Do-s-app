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
  --white: #fffdf7;
  --gray: #efece6;
  --dark-gray: #91908d;
  --light-black: #494846;
  --black: #252422;
  --green: #99a810;
  --light-green: #ddee44;
  --dark-green: #66700a;
  --red: #eb5e28;
  --orange: #ebaf2a;
  --blue: #3394c1;
}

html {
  font-size: 62.5%;
}

body {
  background-color: var(--white);
  font-family: Verdana, sans-serif;
}
</style>
