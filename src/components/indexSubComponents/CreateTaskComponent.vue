<template>
  <div class="bg--gray createTaskBorder">
    <div>
      <h2 class="taskTitleTitle">Titel</h2>
      <input class="taskTitleInput" type="text" v-model="title" />

      <h2 class="mt-2 taskDescriptionTitle">Beschrijving</h2>
      <textarea
        class="taskDescriptionInput"
        type="text"
        v-model="description"
      ></textarea>
    </div>

    <h2 class="subTasksTitle">Subtaken</h2>
    <div
      v-for="(subTask, index) in subTasks"
      :key="subTask['id']"
      class="subTasksSection"
    >
      <div class="subTaskTitleSection">
        <h3 class="subTaskTitleTitle">Titel</h3>
        <input class="subTaskTitleInput" type="text" v-model="subTask.title" />
      </div>

      <div class="subTaskDescriptionSection">
        <h3 class="subTaskTitleTitle">Beschrijving</h3>
        <input
          class="subTaskTitleInput"
          type="text"
          v-model="subTask.description"
        />
      </div>

      <button class="deleteSubTaskButton button" @click="deleteSubTask(index)">
        Verwijder
      </button>
    </div>
    <button class="button addSubtaskButton" @click="addSubTask">
      Subtaak toevoegen
    </button>

    <div class="taskCreateDoneButtonSection">
      <button class="taskCreateDoneButton button" @click="submitTask">
        Toevoegen
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "CreateTaskComponent",
  emits: ["closeAddTask"],
  setup(props, { emit }) {
    const store = useStore();

    const title = ref("");
    const description = ref("");
    const subTasks = ref([]);

    function addSubTask() {
      subTasks.value.push({
        title: "",
        description: "",
      });
    }

    function deleteSubTask(index) {
      subTasks.value.splice(index, 1);
    }

    function checkFieldsValid() {
      if (title.value === "") {
        return false;
      }

      for (let index = 0; index < subTasks.value.length; index++) {
        if (subTasks.value[index]["title"] === "") {
          return false;
        }
      }

      return true;
    }

    async function submitTask() {
      if (checkFieldsValid()) {
        await store.dispatch("addTask", {
          title: title.value,
          description: description.value,
          subTasks: subTasks.value,
        });

        title.value = "";
        description.value = "";
        subTasks.value = [];

        emit("closeAddTask");
      }
    }

    return {
      title,
      description,
      subTasks,
      addSubTask,
      deleteSubTask,
      submitTask,
    };
  },
};
</script>

<style>
.createTaskBorder {
  border-radius: 1rem;
  padding: 2rem;
  border: 0.2rem solid var(--dark-gray);
}

.taskTitleTitle {
  font-size: 2.5rem;
}

.taskTitleInput {
  font-size: 2rem;
  width: 50%;
  padding: 0.5rem;
}

.taskDescriptionTitle {
  font-size: 2rem;
}

.taskDescriptionInput {
  font-size: 1.8rem;
  width: 50%;
  height: 150%;
  padding: 1rem 0.5rem;
}

.subTasksSection {
  display: flex;
  gap: 4rem;
  padding: 1rem;
  border: 0.2rem solid var(--black);
  border-radius: 1rem;
  background-color: var(--dark-gray);
  margin-bottom: 0.5rem;
}

.subTasksTitle {
  margin: 4rem 0 2rem;
  font-size: 2rem;
}

.subTaskTitleSection {
  width: 35%;
}

.subTaskTitleTitle {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: white;
}

.subTaskTitleInput {
  font-size: 1.6rem;
  padding: 0.5rem 0.5rem;
  width: 90%;
}

.subTaskDescriptionSection {
  width: 55%;
}

.deleteSubTaskButton {
  background-color: var(--red);
  color: white;
  height: 100%;
  align-self: center;
  padding: 1rem;
  margin-left: auto;
  border-radius: 1rem;
}

.deleteSubTaskButton:hover {
  color: black;
}

.addSubtaskButton {
  background-color: var(--blue);
  padding: 0.5rem;
  font-size: 1.6rem;
  border-radius: 1rem;
  color: white;
}

.addSubtaskButton:hover {
  color: black;
}

.taskCreateDoneButtonSection {
  display: flex;
  justify-content: center;
}

.taskCreateDoneButton {
  background-color: var(--light-green);
  font-size: 2rem;
  padding: 0.5rem;
  margin-top: 3rem;
}
</style>
