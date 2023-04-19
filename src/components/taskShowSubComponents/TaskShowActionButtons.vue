<template>
  <div class="actionButtonsSection">
    <!-- ALLE SUBTAKEN OOK OP DONE  -->
    <button class="button">Afronden</button>
    
    <button class="button">Archiveren</button>
    <button class="button">Verwijderen</button>
  </div>
</template>

<script>
export default {
  name: "TaskShowActionButtons",
  props: {
    taskId: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style>
.actionButtonsSection {
    margin-top: 4rem;
}
</style>
