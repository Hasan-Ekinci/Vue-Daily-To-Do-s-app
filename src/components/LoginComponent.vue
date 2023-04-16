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

export default {
  name: "LoginComponent",
  setup() {
    const email = ref("");
    const password = ref("");

    function authenticate() {
      if (
        email.value === "" ||
        !email.value.includes("@") ||
        password.value === ""
      ) {
        // error
      } else {
        // start authenticating
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
