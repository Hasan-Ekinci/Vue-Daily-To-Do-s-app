<template>
  <h1>Taken</h1>

  <ul>
    <li v-for="task in tasks" :key="task.id">
      <h2>{{ task.title }}</h2>
      <p>{{ task.description }}</p>
    </li>
  </ul>
</template>

<script>
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import axios from "axios";

export default {
  name: "IndexComponent",
  setup() {
    const store = useStore();

    const tasks = reactive({});
    const token = computed(() => store.getters.token);
    const userId = computed(() => store.getters.userId);

    axios
      .get("http://127.0.0.1:8000/api/tasks/" + userId.value, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      .then((response) => {
        tasks.value = response.data;
      });

    return {
      tasks,
    };
  },
};
</script>
