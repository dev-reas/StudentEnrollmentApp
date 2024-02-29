<template>
  <div>
    <div class="col-12 flex justify-content-center align-items-center mb-3">
      <Modal class="mr-2 ml-2" />
      <Button
        class="mr-2 ml-2"
        label="Edit Student Details"
        severity="info"
        @click="handleEditButtonClick"
      />
      <Button
        class="mr-2 ml-2"
        label="Delete Student Details"
        severity="danger"
        @click="handleDeleteButtonClick"
      />
    </div>
    <DataTable
      v-model:selection="selectedStudent"
      dataKey="stud_id"
      :value="students"
      tableStyle="min-width: 50rem"
    >
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column field="stud_id" header="Student ID"></Column>
      <Column field="stud_name" header="Student Name"></Column>
      <Column field="stud_course" header="Student Course"></Column>
      <Column :field="renderSubjects" header="Student Subjects"></Column>
    </DataTable>

    <Dialog
      v-model="editModalVisible"
      header="Edit Student Details"
      closeIcon="false"
      :visible="editModalVisible"
      @hide="hideEditModal"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    >
      <span class="p-text-secondary block mb-5">Update your information.</span>
      <div v-if="editStudent">
        <div class="field">
          <label for="stud_name" class="font-semibold w-full"
            >Student name</label
          >
          <InputText
            id="stud_name"
            v-model="editStudent.stud_name"
            class="flex-auto w-full"
          />
        </div>

        <div class="field">
          <label for="stud_name" class="font-semibold w-full"
            >Student Course</label
          >
          <InputText
            id="stud_name"
            v-model="editStudent.stud_course"
            class="w-full"
          />
        </div>

        <div class="field">
          <label for="stud_name" class="font-semibold w-full">Subjects</label>
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
          @click="hideEditModal"
        ></Button>
        <Button type="button" label="Submit" @click="submitEditForm"></Button>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, defineComponent } from "vue";
import eventBus from "./eventBus";
import axios from "axios";
import Dialog from "primevue/dialog";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Modal from "@/components/Modal.vue";
import Button from "primevue/button";

export default defineComponent({
  setup() {
    const selectedSubjectNames = ref([]);
    const students = ref([]);
    const selectedStudent = ref(null);
    const editStudent = ref(null);
    const editModalVisible = ref(false);
    const editStudentId = ref("");

    const subjects = [
      { name: "Math" },
      { name: "Physics" },
      { name: "Chemistry" },
      { name: "Algebra" },
      { name: "Calculus" },
      { name: "IT" },
      { name: "Computer Science" },
    ];

    const renderSubjects = (rowData) => {
      return rowData.subject.join(", ");
    };

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5134/student/");
        students.value = response.data;
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    const handleEditButtonClick = async () => {
      if (selectedStudent.value && selectedStudent.value.length > 1) {
        alert("Please select only one student for editing.");
        return;
      }

      const selectedIds = selectedStudent.value.map(
        (student) => student.stud_id
      );

      const id = selectedIds[0];

      try {
        const response = await axios.get(`http://localhost:5134/student/${id}`);
        console.log("Student data for editing:", response.data);
        editStudent.value = response.data;
        editStudentId.value = id; // Store the stud_id
        editModalVisible.value = true; // Show the edit modal
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    const submitEditForm = async () => {
      const subjectNames = selectedSubjectNames.value.map(
        (subject) => subject.name
      );
      const formData = {
        stud_id: editStudentId.value,
        stud_name: editStudent.value.stud_name,
        stud_course: editStudent.value.stud_course,
        subject: subjectNames,
      };

      try {
        await axios.put(
          `http://localhost:5134/student/${editStudentId.value}`,
          formData
        );
        eventBus.emit("formSubmitted");
        editModalVisible.value = false;
        selectedSubjectNames.value = [];
      } catch (error) {
        console.error("Error:", error);
      }
      hideEditModal;
    };

    const hideEditModal = () => {
      editModalVisible.value = false;
    };

    const handleDeleteButtonClick = async () => {
      const selectedIds = selectedStudent.value.map(
        (student) => student.stud_id
      );

      try {
        // Delete all selected students
        await Promise.all(
          selectedIds.map(async (stud_id) => {
            await axios.delete(`http://localhost:5134/student/${stud_id}`);
            console.log(`Deleted student with ID ${stud_id}`);
          })
        );

        // Refresh the data after all deletions are completed
        fetchData();
      } catch (error) {
        console.error("Error deleting student(s):", error);
      }
    };

    onMounted(() => {
      fetchData();
      eventBus.on("formSubmitted", fetchData);
    });

    onUnmounted(() => {
      eventBus.off("formSubmitted", fetchData);
    });

    return {
      students,
      subjects,
      selectedSubjectNames,
      selectedStudent,
      renderSubjects,
      handleEditButtonClick,
      editStudent,
      editModalVisible,
      hideEditModal,
      submitEditForm,
      editStudentId,
      handleDeleteButtonClick,
    };
  },

  components: {
    DataTable,
    Column,
    Button,
    Modal,
    Dialog,
  },
});
</script>
