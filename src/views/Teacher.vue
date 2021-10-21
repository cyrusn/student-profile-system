<template>
  <div class="home">
    <tabs />
    <student-card :students="students" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Tabs from "@/components/Teacher/Tabs.vue";
import StudentCard from "@/components/StudentCard/index.vue";
import { useStudents } from "@/composables/student";
import { useCheckLogin } from "@/composables/auth";

export default defineComponent({
  components: { Tabs, StudentCard },
  setup() {
    const { students } = useStudents();
    const checkLogin = useCheckLogin();
    onMounted(checkLogin);
    return {
      students,
    };
  },
});
</script>
