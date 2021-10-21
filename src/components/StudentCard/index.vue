<template>
  <div class="tile is-parent" v-for="(student, key) in students" :key="key">
    <div class="tile is-child">
      <card :student="student" :comments="commentsByRegno[student.regno]">
      </card>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import { useRoute } from "vue-router";
import { Student } from "@/graphql/student";
import Card from "@/components/StudentCard/Card.vue";
import { useComments } from "@/composables/comment";

export default defineComponent({
  components: { Card },
  props: {
    students: {
      type: Array as PropType<Student[]>,
      required: true,
    },
  },
  setup(props) {
    const route = useRoute();
    const session = computed(() => route.params.session);
    const students = computed(() => props.students);
    const { commentsByRegno } = useComments(students);

    return {
      session,
      commentsByRegno,
    };
  },
});
</script>
