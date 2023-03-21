<template>
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

<style></style>
