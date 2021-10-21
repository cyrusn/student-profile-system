<template>
  <div class="navbar-item has-dropdown is-hoverable">
    <a class="navbar-link"> {{ schoolYear }}</a>
    <div class="navbar-dropdown">
      <a
        class="navbar-item"
        v-for="(schoolYear, key) in schoolYears"
        :key="key"
        @click="updateSchoolYear(schoolYear)"
      >
        {{ schoolYear }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "vuex";
import { defineComponent, computed } from "vue";
import { useSchoolYears } from "@/composables/schoolYear";

export default defineComponent({
  setup() {
    const store = useStore();
    const schoolYear = computed(() => store.state.schoolYear);
    const { schoolYears } = useSchoolYears();
    const updateSchoolYear = (schoolYear: number) => {
      store.commit("updateSchoolYear", schoolYear);
    };

    return {
      schoolYear,
      schoolYears,
      updateSchoolYear,
    };
  },
});
</script>
