<template>
  <router-link :to="{ name: 'show', params: { id: task.id }}">
    <div :class="['taskListWarpper border', borderColor]">
      <div class="p-05">
        <h2 class="taskListTitle">{{ task.title }}</h2>
        <p class="taskListDescription">{{ task.description }}</p>
        <i v-if="task.subtasks_count > 0">{{ task.done_sub_tasks_count }} van de {{ task.subtasks_count }} subtaken voltooid</i>
      </div>
    </div>
  </router-link>
</template>

<script>
import { computed } from "vue";

export default {
  name: "TaskComponent",
  props: {
    task: {
      type: Object,
      required: false,
    },
    borderColors: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const borderColor = computed(() => {
      if (props.borderColors) {
        if (props.task.done === 1) {
          return "border--green";
        } else if (props.task.archived === 1) {
          return "border--red";
        }
        return "border--blue";
      }
      return "";
    });

    return {
      borderColor,
    };
  },
};
</script>

<style>
.taskListWarpper {
  width: 100%;
  background-color: var(--gray);
  margin-bottom: 1rem;
  display: flex;
  gap: 2rem;
}

.taskListTitle {
  font-size: 2.5rem;
}

.taskListDescription {
  align-self: center;
  font-size: 1.8rem;
}
</style>
