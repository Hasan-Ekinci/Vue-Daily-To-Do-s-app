import { createApp } from "vue";
import router from "./router.js";
import App from "./App.vue";
import store from "./store.js";
import axios from "axios";
import VueAxios from "vue-axios";

// import global components
import BaseComponent from './components/BaseComponent.vue';

const app = createApp(App);
app.use(VueAxios, axios);
app.use(router);
app.use(store);
app.component('BaseComponent', BaseComponent);

app.mount("#app");
