<template>
  <div class="loginWrapper">
    <h1>Daily To Do's</h1>

    <form class="loginForm" @submit.prevent="authenticate">
      <h2 v-show="loginMode">Login</h2>
      <h2 v-show="!loginMode">Registreren</h2>
      <button
        @click.prevent="loginMode = !loginMode"
        class="changeLoginMode"
        v-show="!loginMode"
      >
        of login
      </button>
      <button
        @click.prevent="loginMode = !loginMode"
        class="changeLoginMode"
        v-show="loginMode"
      >
        of registreer
      </button>

      <h3>Email</h3>
      <input type="email" v-model="email" />
      <h3>Wachtwoord</h3>
      <input type="password" v-model="password" />

      <br />
      <button v-show="loginMode" class="loginFormButton" type="submit">
        Login
      </button>
      <button v-show="!loginMode" class="loginFormButton" type="submit">
        Register
      </button>
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

    const loginMode = ref(true);

    async function authenticate() {
      if (
        email.value === "" ||
        !email.value.includes("@") ||
        password.value === ""
      ) {
        // error, make something here
      } else if (loginMode.value === true) {
        await store.dispatch("login", {
          email: email.value,
          password: password.value,
        });
        const loggedIn = computed(() => store.state.loggedIn);
        if (loggedIn.value === true) {
          router.push({ path: "/" });
        }
      } else {
        await store.dispatch("register", {
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
      loginMode,
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

.loginFormButton {
  margin: 0 auto;
  display: block;
  background-color: var(--light-green);
  font-size: 2rem;
  padding: 1rem;
  border-radius: 1rem;
  cursor: pointer;
}

.loginFormButton:hover {
  background-color: var(--light-gray);
}

.loginFormButton:active {
  background-color: var(--dark-gray);
  color: white;
}

.changeLoginMode {
  margin: 1rem 0 2rem;
  font-size: 1.5rem;
  padding: 0.5rem;
  border-radius: 1rem;
  cursor: pointer;
}

.changeLoginMode:hover {
  background-color: var(--light-gray);
}

.changeLoginMode:active {
  background-color: var(--dark-gray);
  color: white;
}
</style>
