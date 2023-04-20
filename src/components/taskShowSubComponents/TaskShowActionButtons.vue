<template>
  <div class="actionButtonsSection">
    <!-- ALLE SUBTAKEN OOK OP DONE  -->
    <button
      class="button actionShowButton"
      :style="'background-color:' + buttonText.done.color"
      @click="doAction('done', !task.done)"
    >
      {{ buttonText.done.text }}
    </button>

    <button
      v-if="!task.done"
      class="button actionShowButton"
      :style="'background-color:' + buttonText.archived.color"
      @click="doAction('archive', !task.archived)"
    >
      {{ buttonText.archived.text }}
    </button>
    <button class="button bg--red actionShowButton" @click="doAction('delete')">
      Verwijderen
    </button>
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

      if (action === "delete") {
        router.push({ path: "/" });
      }
    }

    const buttonText = ref({
      done: {
        text: props.task.done ? "Toch niet klaar" : "Afronden",
        color: props.task.done ? "var(--gray)" : "var(--light-green)",
      },
      archived: {
        text: props.task.archived ? "Uit archief halen" : "Archiveren",
        color: props.task.archived ? "var(--blue)" : "var(--gray)",
      },
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
  margin: 4rem 0 8rem;
  display: flex;
  gap: 4rem;
  justify-content: center;
}

.actionShowButton {
  font-size: 2.5rem;
  border-radius: 0.5rem;
}

@media only screen and (max-width: 720px) {
  .actionButtonsSection {
    flex-direction: column;
    width: 100%;
    gap: 2rem;
    margin-bottom: 4rem;
  }
  .actionShowButton {
    width: 40%;
    margin: 0 auto;
  }
}
</style>
