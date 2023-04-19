<template>
    <div class="showSubTask border">
        <h1 class="showSubTaskTitle">{{ subTask.title }}</h1>
        <h2 class="showSubTaskDescription">{{ subTask.description }}</h2>
    </div>
</template>

<script>
export default {
  name: "TaskShowSubTasks",
  props: {
    subTask: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
.showSubTask {
    margin-top: 4rem;
    padding: 0.5rem;
    display: flex;
    background-color: var(--gray);
}

.showSubTaskTitle {
    width: 30%;
}

.showSubTaskDescription {
    font-weight: normal;
    width: 70%;
    align-self: center;
}

@media only screen and (max-width: 600px) {
  .showSubTask {
    display: block;
  }
}
</style>
