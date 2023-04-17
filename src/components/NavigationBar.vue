<template class>
  <div class="navbar">
    <p>Navigation Bar komt hier</p>

    <button @click="logout">Log Uit</button>

    <!-- Dit is een link -->
    <!-- <router-link to="/my-route">My Link</router-link>  -->
</div>
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

<style>
.navbar {
  background-color: var(--black);
  color: white;
  margin-bottom: 2rem;
  height: 5rem;
  font-size: 2.5rem;
  display: flex;
  gap: 5rem;
}
</style>
