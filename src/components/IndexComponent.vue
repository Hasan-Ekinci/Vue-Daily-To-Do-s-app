<template>
  <BaseComponent>
    <h1 class="pageHeader">Alle Taken</h1>

    <div>
      <div class="addTaskButtonSection">
        <Transition name="text-change" mode="out-in">
          <button
            :class="[
              'addTaskButtonSectionButton border button',
              showAddTaskText.colorClass,
            ]"
            @click="showAddTask = !showAddTask"
            :key="showAddTaskText.text"
          >
            {{ showAddTaskText.text }}
          </button>
        </Transition>
      </div>

      <Transition name="add-task-animation">
        <KeepAlive>
          <CreateTaskComponent
            class="mb-2"
            :key="0"
            v-if="showAddTask"
            @close-add-task="showAddTask = !showAddTask"
          />
        </KeepAlive>
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
import TaskComponent from "./indexSubComponents/TaskComponent.vue";
import CreateTaskComponent from "./indexSubComponents/CreateTaskComponent.vue";

export default {
  name: "IndexComponent",
  components: {
    TaskComponent,
    CreateTaskComponent,
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
        text: !showAddTask.value ? "Voeg taak toe" : "Verberg",
        colorClass: showAddTask.value ? "bg--orange" : "bg--light-green",
      };
    });

    return {
      tasks,
      showAddTask,
      showAddTaskText,
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

.addTaskButtonSection {
  display: flex;
  justify-content: end;
  margin: 2rem 0;
}

.addTaskButtonSectionButton {
  font-size: 2rem;
  padding: 0.5rem;
}

.text-change-enter-active {
  transition: all 0.2s ease;
}

.text-change-leave-active {
  transition: all 0.2s ease;
}

.text-change-enter,
.text-change-leave-to {
  opacity: 0;
}

.add-task-animation-enter-active {
  animation: slowlyAppear 0.4s ease;
}

.add-task-animation-leave-active {
  animation: slowlyAppear 0.4s ease-in;
  animation-direction: reverse;
}

@keyframes slowlyAppear {
  from {
    opacity: 0%;
    transform: translateY(-100%);
    margin-bottom: -30%;
  }
  to {
    opacity: 100%;
    transform: translateY(0);
    margin-bottom: 2rem;
  }
}
</style>
