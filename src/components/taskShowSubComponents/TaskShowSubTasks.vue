<template>
  <div
    :class="[
      'showSubTask border',
      subTask.done || mainTaskDone ? 'bg--light-green' : 'bg--gray',
    ]"
  >
    <div v-if="!editField.title" class="showSubTaskTitleSection">
      <h1 class="showSubTaskTitle">{{ subTask.title }}</h1>
      <button @click="editField.title = !editField.title" class="button">
        Aanpassen
      </button>
    </div>
    <EditFieldComponent
      v-else
      :input-value="subTask.title"
      :id="subTask.id"
      :is-sub-task="true"
      width="30%"
      @close-edit="updateFields('title', $event)"
    />

    <div v-if="!editField.description" class="showSubTaskDescriptionSection">
      <h2 class="showSubTaskDescription">{{ subTask.description }}</h2>
      <button
        @click="editField.description = !editField.description"
        class="button"
      >
        Aanpassen
      </button>
    </div>
    <EditFieldComponent
      v-else
      :input-value="subTask.description"
      :id="subTask.id"
      :is-sub-task="true"
      :is-title="false"
      width="70%"
      @close-edit="updateFields('description', $event)"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import EditFieldComponent from "./EditFieldComponent.vue";

export default {
  name: "TaskShowSubTasks",
  emits: ["getTask"],
  components: {
    EditFieldComponent,
  },
  props: {
    subTask: {
      type: Object,
      required: true,
    },
    mainTaskDone: {
      type: Boolean,
      required: true,
    },
  },
  setup(_, { emit }) {
    const editField = ref({
      title: false,
      description: false,
    });

    function updateFields(field, editted) {
      editField.value[field] = false;
      if (editted) {
        emit("getTask");
      }
    }

    return {
      editField,
      updateFields,
    };
  },
};
</script>

<style>
.showSubTask {
  margin-top: 1rem;
  padding: 0.5rem;
  display: flex;
  gap: 2rem;
}

.showSubTaskTitleSection {
  width: 30%;
}

.showSubTaskTitle {
  margin-bottom: 0.5rem;
}

.showSubTaskDescriptionSection {
  font-weight: normal;
  width: 70%;
  align-self: start;
}

.showSubTaskDescription {
  font-weight: normal;
  margin-bottom: 0.5rem;
}

@media only screen and (max-width: 600px) {
  .showSubTask {
    display: block;
  }
}
</style>
