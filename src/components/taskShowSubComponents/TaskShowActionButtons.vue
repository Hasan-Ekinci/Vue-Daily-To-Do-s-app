<template>
  <div class="actionButtonsSection">
    <!-- ALLE SUBTAKEN OOK OP DONE  -->
    <button class="button" @click="doAction('done', !task.done)">
      {{ buttonText.done }}
    </button>

    <button
      v-if="!task.done"
      class="button"
      @click="doAction('archive', !task.archived)"
    >
      {{ buttonText.archived }}
    </button>
    <button class="button bg--red" @click="doAction('delete')">Verwijderen</button>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "TaskShowActionButtons",
  emits: ["getTask"],
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();

    async function doAction(action, newValue = null) {
      const success = await store.dispatch("taskAction", {
        id: props.task.id,
        isSubtask: false,
        action: action,
        newValue: newValue,
      });

      if (success) {
        emit("getTask", true);
      } else {
        alert("Action failed");
      }

      if (action === 'delete') {
        router.push({ path: "/" });
      }
    }

    const buttonText = ref({
      done: props.task.done ? "Toch niet klaar" : "Afronden",
      archived: props.task.archived ? "Uit archief halen" : "Archiveren",
    });

    return {
      doAction,
      buttonText,
    };
  },
};
</script>

<style>
.actionButtonsSection {
  margin: 4rem 0;
}
</style>
