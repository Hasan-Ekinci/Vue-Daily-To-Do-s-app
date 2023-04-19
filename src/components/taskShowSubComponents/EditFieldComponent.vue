<template>
  <div class="editFieldSection"
  :style="'width:' + width + ';'">
    <input
      class="editFieldInput"
      :type="type"
      v-model="editValue"
    />

    <div class="editFieldButtonSection">
      <button @click="saveEdit" class="button greenButton">Opslaan</button>
      <button @click="cancelEdit" class="button redButton">Annuleren</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "EditFieldComponent",
  emits: ["closeEdit"],
  props: {
    type: {
      type: String,
      default: "text",
    },
    inputValue: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "",
    },
    isTitle: {
      type: Boolean,
      default: true,
    },
    isSubTask: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const store = useStore();

    const editValue = ref(props.inputValue);

    function cancelEdit() {
      emit("closeEdit", false);
    }

    async function saveEdit() {
      const success = await store.dispatch("saveEdit", {
        newValue: editValue.value,
        id: props.id,
        isSubtask: props.isSubTask,
        isTitle: props.isTitle,
      });

      if (success) {
        emit("closeEdit", true);
      } else {
        alert("Did not save");
      }
    }

    return {
      editValue,
      cancelEdit,
      saveEdit,
    };
  },
};
</script>

<style>
.editFieldSection {
  margin-bottom: 2rem;
}

.editFieldInput {
  margin-bottom: 2rem;
  padding: 0.5rem;
  width: 100%;
}

.editFieldButtonSection {
  display: flex;
  gap: 4rem;
}
</style>
