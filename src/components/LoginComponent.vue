<template>
  <form @submit.prevent="authenticate">
    <h1>Login</h1>
    <h2>Email</h2>
    <input type="text" v-model="email" />
    <h2>Wachtwoord</h2>
    <input type="password" v-model="password" />
    <button type="submit">Login</button>
  </form>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "LoginComponent",
  setup() {
    const store = useStore();
    const router = useRouter();

    const email = ref("hasan@email.com");
    const password = ref("password");

    async function authenticate() {
      if (
        email.value === "" ||
        !email.value.includes("@") ||
        password.value === ""
      ) {
        // error
      } else {
        await store.dispatch("login", {
          email: email.value,
          password: password.value,
        });
        const loggedIn = computed(() => store.state.loggedIn);
        if (loggedIn.value === true) {
          router.push({ path: "/" });
        }
      }
    }

    return {
      email,
      password,
      authenticate,
    };
  },
};
</script>
