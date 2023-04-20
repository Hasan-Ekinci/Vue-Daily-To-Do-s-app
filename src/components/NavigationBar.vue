<template class>
  <div v-if="screenWidth > 720" class="navbar">
    <div class="logWrapper">
      <h1 class="logo">Daily<br />To Do's</h1>
    </div>

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

  <div v-else class="mobileNav">
    <button @click="toggleMobileMenu(true)" class="mobileNavButton">
      Menu
    </button>

    <!-- transform: translateX(100%) -->

    <div
      class="mobileNavBar"
      :style="{
        background: showMobileMenu
          ? 'rgba(73, 72, 70, 0.8)'
          : 'rgba(73, 72, 70, 0)',
      }"
    >
      <div
        class="mobileNavBarLeft"
        :style="{
          transform: showMobileMenu ? 'translateX(0%)' : 'translateX(-100%)',
        }"
      >
        <span @click="toggleMobileMenu(false)" class="closeModalArea"></span>
      </div>

      <div
        class="mobileNavBarRight"
        :style="{
          transform: showMobileMenu ? 'translateX(0%)' : 'translateX(100%)',
        }"
      >
        <div class="mobileNavInnerWrapper">
          <div class="logoWrapperMobile">
            <h1 class="logoMobile">Daily<br />To Do's</h1>
          </div>

          <router-link
            to="/"
            @click="toggleMobileMenu(false)"
            class="nav-link-wrapper-mobile"
          >
            <p class="align-center nav-link-mobile">Alle taken</p>
          </router-link>

          <router-link
            to="/"
            @click="toggleMobileMenu(false)"
            class="nav-link-wrapper-mobile"
          >
            <p class="align-center nav-link-mobile">Actief</p>
          </router-link>

          <router-link
            to="/"
            @click="toggleMobileMenu(false)"
            class="nav-link-wrapper-mobile"
          >
            <p class="align-center nav-link-mobile">Gearchiveerd</p>
          </router-link>

          <router-link
            to="/"
            @click="toggleMobileMenu(false)"
            class="nav-link-wrapper-mobile"
          >
            <p class="align-center nav-link-mobile">Afgerond</p>
          </router-link>

          <button
            @click="toggleMobileMenu(false)"
            class="closeModalInside button"
          >
            Sluit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
  name: "NavigationBar",
  setup() {
    const store = useStore();
    const router = useRouter();

    const screenWidth = ref(window.innerWidth);
    window.addEventListener("resize", () => {
      screenWidth.value = window.innerWidth;
    });

    function logout() {
      store.commit("logout");
      router.push({ path: "/login" });
    }

    const showMobileMenu = ref(true);
    function toggleMobileMenu(newValue) {
      showMobileMenu.value = newValue;
      console.log(showMobileMenu.value);
    }

    return {
      logout,
      screenWidth,
      showMobileMenu,
      toggleMobileMenu,
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
  position: fixed;
  width: 100%;
  top: 0;
}

.logWrapper {
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: var(--dark-gray);
}

.logo {
  font-size: 3rem;
  padding: 1rem;
  cursor: default;
  align-self: center;
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

/* MOBILE NAVBAR */
.mobileNavBar {
  width: 100%;
  height: 100%;
  position: fixed;
  display: grid;
  grid-template-columns: 30% 70%;
  transition: all 0.4s;
  pointer-events: none;
}

.mobileNavBarLeft {
  width: 100%;
  height: 100%;
  grid-column: 1 / span 2;
  grid-row: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  pointer-events: auto;
  transition: all 0.4s;
  opacity: 0;
}

.closeModalArea {
  grid-column: 1 / span 1;
  width: 100%;
  height: 100%;
  background-color: var(--light-black);
}

.mobileNavBarRight {
  width: 100%;
  height: 100%;
  background-color: var(--light-black);
  grid-column: 2 / span 1;
  grid-row: 1;
  opacity: 100%;
  pointer-events: auto;
  transition: all 0.4s;
  color: white;
}

.mobileNavInnerWrapper {
  display: grid;
  grid-template-rows: repeat(20, minmax(0, 1fr));
  height: 100%;
}

.mobileNavButton {
  position: fixed;
  top: 6rem;
  right: 8%;
  background-color: var(--dark-gray);
  color: white;
  font-size: 2rem;
  padding: 1rem;
}

.mobileNavButton:active {
  background-color: var(--light-black);
}

.logoWrapperMobile {
  display: flex;
  padding-left: 2rem;
  background-color: var(--dark-gray);
  grid-row: span 3;
}

.logoMobile {
  align-self: center;
  font-size: 3.5rem;
}

.nav-link-wrapper-mobile {
  display: flex;
  align-self: center;
  justify-content: center;
  justify-content: center;
  grid-row: span 2;
  width: 100%;
  height: 100%;
  background: rgb(73, 72, 70);
  background: linear-gradient(
    145deg,
    rgba(73, 72, 70, 1) 0%,
    rgba(145, 144, 141, 1) 50%,
    rgba(73, 72, 70, 1) 100%
  );
}

.nav-link-mobile {
  color: white;
  font-size: 2rem;
}

.nav-link-wrapper-mobile:active {
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

.closeModalInside {
  grid-row: 19 / span 2;
  font-size: 2rem;
}

@media only screen and (max-width: 890px) {
  .logo {
    font-size: 2rem;
  }
}
</style>
