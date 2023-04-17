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

    async function getAllTasks() {
      await store.dispatch("getAllTasks");
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

<style>
.emptyScreenMessage {
  font-size: 2rem;
  text-align: center;
  margin-top: 5rem;
}
</style>
