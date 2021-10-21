<template>
  <a
    class="navbar-item"
    v-if="isClassOrGroupFilter"
    :class="isActive"
    @click="goto(`/session/${session}`)"
    >{{ sessionDisplayName }}</a
  >
  <div
    v-else-if="privilegeNames.length"
    class="navbar-item has-dropdown is-hoverable"
  >
    <a class="navbar-link"> {{ sessionDisplayName }} </a>
    <div class="navbar-dropdown">
      <a
        class="navbar-item"
        v-for="(name, key) in privilegeNames"
        :key="key"
        @click="goto(`/session/${session}/?privilege=${name}`)"
      >
        {{ name }}
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { SESSION_FILTER } from "@/constant";
import { useRouter, useRoute } from "vue-router";
import { defineComponent, computed } from "vue";

import { useTeacherPrivileges } from "@/composables/privilege";

export default defineComponent({
  props: {
    session: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const route = useRoute();
    const { privilegeNames } = useTeacherPrivileges();

    const sessionDisplayName = computed(() => {
      switch (props.session) {
        case SESSION_FILTER.BY_CLASS:
          return "任教班別";
        case SESSION_FILTER.BY_GROUP:
          return "任教組別";
        case SESSION_FILTER.BY_PRIVILEGE:
          return "其他權限";
        default:
          return "";
      }
    });

    const goto = (link: string) => {
      router.push(link);
    };

    const isClassOrGroupFilter = computed(() => {
      return props.session !== SESSION_FILTER.BY_PRIVILEGE;
    });

    const isActive = computed(() => {
      return {
        "is-active": props.session == route.params.session,
      };
    });

    return {
      isActive,
      sessionDisplayName,
      isClassOrGroupFilter,
      privilegeNames,
      goto,
    };
  },
});
</script>
