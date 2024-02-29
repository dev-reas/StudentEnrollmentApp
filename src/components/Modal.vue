<template>
  <div>
    <Button label="Add Student Details" @click="visible = true" />

    <Dialog
      v-model:visible="visible"
      modal
      closeIcon="false"
      header="Enter Student Information"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <StudentForm :onClick="updateModalVisibility" />
    </Dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import StudentForm from "./StudentForm.vue";

export default {
  components: {
    Button,
    Dialog,
    StudentForm,
  },
  setup() {
    const visible = ref(false);

    const updateModalVisibility = (newVisibility) => {
      visible.value = newVisibility;
    };

    return {
      visible,
      updateModalVisibility,
    };
  },
};
</script>
