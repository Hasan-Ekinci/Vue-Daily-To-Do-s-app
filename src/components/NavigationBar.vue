<template class>
  <div class="navbar">
    <h1 class="logo">Daily<br />To Do's</h1>

    <div class="naviagtion align-center">
      <router-link to="/" class="nav-link-wrapper">
        <p class="align-center nav-link">Alle taken</p>
      </router-link>

      <router-link to="/" class="nav-link-wrapper">
        <p class="align-center nav-link">Actief</p>
      </router-link>

      <router-link to="/" class="nav-link-wrapper">
        <p class="align-center nav-link">Gearchiveerd</p>
      </router-link>

      <router-link to="/" class="nav-link-wrapper">
        <p class="align-center nav-link">Afgerond</p>
      </router-link>
    </div>

    <div class="logout-button-section">
      <button class="align-center button redButton" @click="logout">
        Log Uit
      </button>
    </div>
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
  background-color: var(--light-black);
  color: white;
  margin-bottom: 2rem;
  height: 8rem;
  font-size: 2.5rem;
  display: flex;
  gap: 1rem;
}

.logo {
  font-size: 3rem;
  padding-left: 4rem;
  width: 20%;
  background-color: #91908d;
  cursor: default;
}

.naviagtion {
  width: 80%;
  height: 100%;
  display: flex;
  gap: 1rem;
  font-size: 2rem;
  justify-content: space-around;
}

.align-center {
  align-self: center;
}

.logout-button-section {
  width: 20%;
  display: flex;
  justify-content: center;
}

.nav-link-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-self: center;
  justify-content: center;
}

.nav-link {
  text-align: center;
  align-self: center;
  color: white;
}

.nav-link-wrapper:hover {
  background: rgb(73, 72, 70);
  background: linear-gradient(
    90deg,
    rgba(73, 72, 70, 1) 0%,
    rgba(145, 144, 141, 1) 50%,
    rgba(73, 72, 70, 1) 100%
  );
}

.nav-link-wrapper:active {
  background: rgb(73, 72, 70);
  background: linear-gradient(
    90deg,
    rgba(73, 72, 70, 1) 0%,
    rgba(145, 144, 141, 1) 25%,
    rgba(145, 144, 141, 1) 50%,
    rgba(145, 144, 141, 1) 75%,
    rgba(73, 72, 70, 1) 100%
  );
}
</style>
