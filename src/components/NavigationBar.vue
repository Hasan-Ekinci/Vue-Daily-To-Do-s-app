<template>
  <p>Navigation Bar komt hier</p>

  <button @click="logout">Log Uit</button>

  <!-- Dit is een link -->
  <!-- <router-link to="/my-route">My Link</router-link>  -->
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "NavigationBar",
  setup() {
    const store = useStore();
    const router = useRouter();

    function logout() {
      store.commit("logout");
      router.push({ path: "/login" });
    }

    return {
      logout,
    };
  },
};
</script>
