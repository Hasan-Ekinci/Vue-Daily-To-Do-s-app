<template>
  <BaseComponent>
    <h1 class="pageHeader">Alle Taken</h1>

    <div v-if="tasks.tasks && tasks.tasks.length > 0">
      <TaskComponent
        v-for="task in tasks.tasks"
        :key="task.id"
        :task="task"
        :border-colors="true"
      />
    </div>
    <h2 v-else class="emptyScreenMessage">Geen taken gevonden</h2>
  </BaseComponent>
</template>

<script>
import { computed, reactive, onMounted } from "vue";
import { useStore } from "vuex";
import TaskComponent from "./indexSubComponents/TaskComponent.vue";

export default {
  name: "TasksDoneComponent",
  components: {
    TaskComponent,
  },
  setup() {
    const store = useStore();

    const tasks = reactive({
      tasks: {},
    });

    async function getAllTasks() {
      await store.dispatch("getAllTasks", 'done');
      tasks.tasks = computed(() => store.state.tasks);
    }
    onMounted(() => {
      getAllTasks();
    });

    return {
      tasks,
    };
  },
};
</script>
