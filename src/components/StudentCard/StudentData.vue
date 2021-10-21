<template>
  <div class="block">
    <span class="tag is-dark">{{ classCodeNumber }}</span>
    {{ student.cname || student.ename }}
    <span v-if="student.cname">
      {{ student.ename }}
    </span>
    <StudentTags class="mt-2" :student="student" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import StudentTags from "@/components/StudentCard/StudentTags.vue";

import { Student } from "@/graphql/student";
export default defineComponent({
  props: {
    student: {
      type: Object as PropType<Student>,
      required: true,
    },
  },
  components: {
    StudentTags,
  },
  setup(props) {
    const classCode = computed(() => props.student.classCode);
    const classNumber = computed(() => props.student.classNumber);
    const classCodeNumber = computed(() => {
      return `${classCode.value}${
        classNumber.value || (0).toString().padStart(2, "0")
      }`;
    });
    return { classCodeNumber };
  },
});
</script>
