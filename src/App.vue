<template>

  <!-- TO DO: maak navigation bar conditional, alleen voor ingelogde pagina's -->
  <NavigationBar />
  <router-view />
</template>

<script>
import NavigationBar from './components/NavigationBar.vue'

export default {
  name: "daily_to_do",
  components: {
    NavigationBar
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0
}
</style>
