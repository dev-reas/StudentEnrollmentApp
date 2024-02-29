<template>
  <div class="grid mt-3">
    <div class="field col-6 md:col-6 lg:col-12">
      <FloatLabel>
        <InputText id="student_name" v-model="studentName" class="w-full" />
        <label for="student_name">Student Name</label>
      </FloatLabel>
    </div>
    <div class="field col-6 md:col-6 lg:col-12">
      <FloatLabel>
        <InputText id="student_course" v-model="studentCourse" class="w-full" />
        <label for="student_course">Student Course</label>
      </FloatLabel>
    </div>
    <div class="field col-6 md:col-6 lg:col-12">
      <MultiSelect
        v-model="selectedSubjectNames"
        display="chip"
        :options="subjects"
        optionLabel="name"
        placeholder="Select Subject"
        class="w-full"
      />
    </div>
  </div>
  <div class="flex justify-content-end gap-2">
    <Button
      type="button"
      label="Cancel"
      severity="secondary"
      @click="cancelModal"
    ></Button>
    <Button type="button" label="Submit" @click="saveForm"></Button>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import axios from "axios";
import eventBus from "./eventBus";

import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import MultiSelect from "primevue/multiselect";

export default defineComponent({
  components: {
    FloatLabel,
    InputText,
    Button,
    MultiSelect,
  },
  setup(props) {
    const studentName = ref("");
    const studentCourse = ref("");
    const selectedSubjectNames = ref([]);

    const subjects = [
      { name: "Math" },
      { name: "Physics" },
      { name: "Chemistry" },
      { name: "Algebra" },
      { name: "Calculus" },
      { name: "IT" },
      { name: "Computer Science" },
    ];

    const cancelModal = () => {
      props.onClick(false);
    };

    const saveForm = async () => {
      const subjectNames = selectedSubjectNames.value.map(
        (subject) => subject.name
      );
      const formData = {
        stud_name: studentName.value,
        stud_course: studentCourse.value,
        subject: subjectNames,
      };

      try {
        await axios.post("http://localhost:5134/student/add", formData);
        eventBus.emit("formSubmitted");
        props.onClick(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    return {
      studentName,
      studentCourse,
      subjects,
      selectedSubjectNames,
      cancelModal,
      saveForm,
    };
  },
  props: {
    onClick: Function,
  },
});
</script>
