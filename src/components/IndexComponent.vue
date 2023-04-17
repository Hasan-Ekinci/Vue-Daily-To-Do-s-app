<template>
  <BaseComponent>
    <h1 class="pageHeader">Alle Taken</h1>

    <div>
      <TaskComponent
        v-for="task in tasks.tasks"
        :key="task.id"
        :task="task"
        :border-colors="true"
      />
    </div>
  </BaseComponent>
</template>

<script>
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import axios from "axios";
import TaskComponent from "./subcomponents/TaskComponent.vue";

export default {
  name: "IndexComponent",
  components: {
    TaskComponent,
  },
  setup() {
    const store = useStore();

    const tasks = reactive({
      tasks: {},
    });
    const token = computed(() => store.getters.token);
    const userId = computed(() => store.getters.userId);

    axios
      .get("http://127.0.0.1:8000/api/tasks/" + userId.value, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      })
      .then((response) => {
        tasks.tasks = response.data;
      });

    return {
      tasks,
    };
  },
};
</script>
