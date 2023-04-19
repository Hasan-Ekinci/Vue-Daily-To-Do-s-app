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

      <h2 class="taskStatus">
        Status:
        <i :style="'color:' + taskStatus.color">{{ taskStatus.text }}</i>
      </h2>

      <div v-if="!editField.description">
        <h3 class="taskShowDescription">{{ task.description }}</h3>
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

      <TaskShowActionButtons
        v-if="showActionButtons"
        :task="task"
        @get-task="getTask"
      />

      <div v-for="subTask in task.subtasks" :key="subTask.id">
        <TaskShowSubTasks
          :sub-task="subTask"
          :main-task-done="task.done"
          @get-task="getTask"
        />
      </div>
    </div>
    <h2 v-else>Geen taak gevonden</h2>
  </BaseComponent>
</template>

<script>
import { onMounted, ref, computed, nextTick } from "vue";
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

    const showActionButtons = ref(true);

    async function getTask() {
      task.value = await store.dispatch("getTask", taskId);

      showActionButtons.value = false;
      nextTick(() => {
        showActionButtons.value = true;
      });
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

    const taskStatus = computed(() => {
      if (task.value.done) {
        return {
          text: "Afgerond",
          color: "var(--green)",
        };
      } else if (task.value.archived) {
        return {
          text: "Gearchiveerd",
          color: "var(--red)",
        };
      }
      return {
        text: "Actief",
        color: "var(--blue)",
      };
    });

    return {
      task,
      showActionButtons,
      editField,
      updateFields,
      getTask,
      taskStatus,
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

.taskStatus {
  margin-bottom: 2rem;
  font-size: 2rem;
}

.taskShowDescription {
  font-size: 2rem;
  font-weight: normal;
  margin-bottom: 0.5rem;
}
</style>
