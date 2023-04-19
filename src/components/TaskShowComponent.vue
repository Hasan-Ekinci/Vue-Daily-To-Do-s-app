<template>
  <BaseComponent>
    <div v-if="task && Object.keys(task).length > 0">
      <div v-if="!editField.title" class="taskShowTitleSection">
        <h1 class="taskShowTitle">{{ task.title }}</h1>
        <button @click="editField.title = !editField.title" class="button">
          Aanpassen
        </button>
      </div>
      <EditFieldComponent
        v-else
        :input-value="task.title"
        :id="task.id"
        width="80%"
        @close-edit="updateFields('title', $event)"
      />

      <div v-if="!editField.description">
        <h2 class="taskShowDescription">{{ task.description }}</h2>
        <button
          @click="editField.description = !editField.description"
          class="button"
        >
          Aanpassen
        </button>
      </div>
      <EditFieldComponent
        v-else
        :input-value="task.description"
        :id="task.id"
        :is-title="false"
        width="80%"
        @close-edit="updateFields('description', $event)"
      />

      <TaskShowActionButtons :task-id="task.id" />

      <div v-for="subTask in task.subtasks" :key="subTask.id">
        <TaskShowSubTasks :sub-task="subTask" />
      </div>
    </div>
    <h2 v-else>Geen taak gevonden</h2>
  </BaseComponent>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

import TaskShowActionButtons from "./taskShowSubComponents/TaskShowActionButtons.vue";
import TaskShowSubTasks from "./taskShowSubComponents/TaskShowSubTasks.vue";
import EditFieldComponent from "./taskShowSubComponents/EditFieldComponent.vue";

export default {
  name: "TaskShowComponent",
  components: {
    TaskShowActionButtons,
    TaskShowSubTasks,
    EditFieldComponent,
  },
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

    const editField = ref({
      title: false,
      description: false,
    });

    function updateFields(field, editted) {
      editField.value[field] = false;
      if (editted) {
        getTask();
      }
    }

    return {
      task,
      editField,
      updateFields,
    };
  },
};
</script>

<style>
.taskShowTitleSection {
  margin-bottom: 3rem;
}
.taskShowTitle {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.taskShowDescription {
  font-size: 2rem;
  font-weight: normal;
  margin-bottom: 0.5rem;
}
</style>
