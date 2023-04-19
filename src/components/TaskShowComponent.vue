<template>
  <BaseComponent>
    <div v-if="task && Object.keys(task).length > 0">
      <h1 class="taskTitle">{{ task.title }}</h1>
      <h2 class="taskDescription">{{ task.description }}</h2>
    </div>
    <h2 v-else>Geen taak gevonden</h2>
  </BaseComponent>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "TaskShowComponent",
  setup() {
    const router = useRouter();
    const store = useStore();
    const taskId = router.currentRoute.value.params.id;

    const task = ref();

    async function getTask() {
      task.value = await store.dispatch("getTask", taskId);
    }

    onMounted(() => {
      getTask();
    });

    return {
      task,
    };
  },
};
</script>

<style scoped>
.taskTitle {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.taskDescription {
    font-size: 2rem;
    font-weight: normal;
}
</style>
