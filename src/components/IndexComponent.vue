<template>
  <BaseComponent>
    <h1 class="pageHeader">Alle Taken</h1>

    <div class="addTaskSection">
      <Transition name="text-change" mode="out-in">
        <button
          :class="['addTaskSectionButton border', showAddTaskText.colorClass]"
          @click="showAddTask = !showAddTask"
          :key="showAddTaskText.text"
        >
          {{ showAddTaskText.text }}
        </button>
      </Transition>
    </div>

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
import { computed, reactive, onMounted, ref } from "vue";
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

    const showAddTask = ref(false);
    const showAddTaskText = computed(() => {
      return {
        text: !showAddTask.value ? "Voeg taken toe" : "Verberg",
        colorClass: showAddTask.value ? "bg--orange" : "bg--light-green",
      };
    });
    // addTask() {

    // }

    return {
      tasks,
      showAddTask,
      showAddTaskText,
      // addTask,
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

.addTaskSection {
  display: flex;
  justify-content: end;
  margin: 2rem 0;
}

.addTaskSectionButton {
  font-size: 2rem;
  padding: 0.5rem;
}

.addTaskSectionButton:hover {
  background-color: var(--gray);
  cursor: pointer;
}

.addTaskSectionButton:active {
  background-color: var(--green);
  color: white;
}

.text-change-enter-active {
  animation: slowlyAppear 0.3s ease;
}

.text-change-leave-active {
  transition: all 0.5s ease;
}

.text-change-enter,
.text-change-leave-to {
  opacity: 0;
}

@keyframes slowlyAppear {
  from {
    opacity: 0%;
  }
  to {
    opacity: 100%;
  }
}
</style>
