<template>
  <div class="loginWrapper">
    <h1>Daily To Do's</h1>

    <form class="loginForm" @submit.prevent="authenticate">
      <h2>Login</h2>
      <h3>Email</h3>
      <input type="email" v-model="email" />
      <h3>Wachtwoord</h3>
      <input type="password" v-model="password" />
      <br />
      <button type="submit">Login</button>
    </form>
  </div>
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
        // error, make something here
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

<style>
.loginWrapper {
  margin: 0 auto;
  height: 50vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.loginForm {
  align-self: center;
}

.loginWrapper h1 {
  font-size: 4rem;
  margin-bottom: 5rem;
  align-self: center;
  background: rgb(73, 72, 70);
  background: linear-gradient(
    145deg,
    rgba(73, 72, 70, 1) 0%,
    rgba(145, 144, 141, 1) 50%,
    rgba(73, 72, 70, 1) 100%
  );
  padding: 0.5rem;
  border-radius: 1rem;
  color: white;
}

.loginForm h2 {
  font-size: 3rem;
  margin-bottom: 2rem;
}

.loginForm h3 {
  font-size: 2rem;
}

.loginForm input {
  margin: 0.5rem auto 3rem;
  font-size: 2rem;
  width: 40rem;
  padding: 0.5rem;
  border-radius: 1rem;
}

.loginForm button {
  margin: 0 auto;
  display: block;
  background-color: var(--light-green);
  font-size: 2rem;
  padding: 1rem;
  border-radius: 1rem;
}

.loginForm button:hover {
  background-color: var(--light-gray);
}

.loginForm button:active {
  background-color: var(--dark-gray);
  color: white;
}
</style>
