<template>
  <div class="media-left has-text-centered column is-one-fifth">
    <figure class="image is-128x128">
      <img :src="studentPhoto" :alt="regno" />
    </figure>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";

import { Student } from "@/graphql/student";
export default defineComponent({
  props: {
    student: {
      type: Object as PropType<Student>,
      required: true,
    },
  },
  setup(props) {
    const regno = computed(() => props.student.regno || "");
    const schoolYear = computed(() => props.student.schoolYear);

    const studentPhoto = computed(() => {
      if (regno.value) {
        try {
          return require(`@/assets/images/${schoolYear.value}/${regno.value}.png`);
        } catch {
          return require(`@/assets/images/generic_user.svg`);
        }
      }
      return "";
    });

    return {
      studentPhoto,
      regno,
    };
  },
});
</script>
