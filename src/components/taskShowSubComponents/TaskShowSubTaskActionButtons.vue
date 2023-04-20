<template>
  <div class="subTaskActionButtonsSection">
    <button
      v-if="showDoneButton"
      @click="doAction('done', !subTask.done)"
      class="button greenButton"
    >
      Afronden
    </button>
    <button v-else @click="doAction('done', !subTask.done)" class="button">
      Toch niet klaar
    </button>

    <button @click="doAction('delete')" class="button redButton">
      Verwijderen
    </button>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "TaskShowSubtaskActionButtons",
  emits: ['getTask'],
  props: {
    subTask: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();

    const showDoneButton = computed(() => !props.subTask.done);

    async function doAction(action, newValue = null) {
      const success = await store.dispatch("taskAction", {
        id: props.subTask.id,
        isSubtask: true,
        action: action,
        newValue: newValue,
      });

      if (success) {
        emit("getTask", true);
      } else {
        alert("Action failed");
      }
    }

    return {
      showDoneButton,
      doAction,
    };
  },
};
</script>

<style>
.subTaskActionButtonsSection {
  width: 20%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
