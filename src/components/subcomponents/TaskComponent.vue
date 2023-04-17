<template>
  <div :class="['taskListWarpper border', borderColor]">
    <h2 class="taskListTitle">{{ task.title }}</h2>
    <p class="taskListDescription">{{ task.description }}</p>
  </div>
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
  padding: 0.5rem;
  display: flex;
  gap: 2rem;
}

.taskListTitle {
  font-size: 2.5rem;
}

.taskListDescription{
  align-self: center;
  font-size: 1.8rem;
}
</style>
