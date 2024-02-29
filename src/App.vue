<script setup>
import Index from "./views/Index.vue";
import StudentForm from "./components/StudentForm.vue";
</script>

<template>
  <main>
    <header class="block bg-transparent font-bold text-center p-4 border-round">
      <h1>Student Enrollment System</h1>
    </header>
    <div>
      <Index />
    </div>
  </main>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Anta&family=Bebas+Neue&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap");

header > h1 {
  font-family: "Bebas Neue", sans-serif;
  font-weight: 400;
  font-style: normal;
}
</style>
