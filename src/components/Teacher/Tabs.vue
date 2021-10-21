<template>
  <div class="tabs is-centered is-boxed" v-if="tabNames.length">
    <ul>
      <li v-for="(name, key) in tabNames" :key="key" :class="isActive(name)">
        <a @click="onClick(name)">{{ name }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from "vue";
import { useStore } from "vuex";
import {
  useTeachingClasses,
  useTeachingGroups,
  usePrivileges,
} from "@/composables/teachingInfo";
import { SESSION_FILTER } from "@/constant";
import { useRouter, useRoute } from "vue-router";
import _ from "lodash";
import { Privilege } from "@/graphql/teachingInfo";
import { useCheckLogin } from "@/composables/auth";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const session = computed(() => route.params.session as SESSION_FILTER);
    const privilege = computed(() => route.query.privilege);
    const classCode = computed(() => route.query.classCode);
    const groupName = computed(() => route.query.groupName);
    const checkLogin = useCheckLogin();
    const { teachingClasses, error: teachingClassesError } =
      useTeachingClasses();
    const { teachingGroups, error: teachingGroupsError } = useTeachingGroups();
    const { privileges, error: privilegesError } = usePrivileges();

    watch(
      [teachingClassesError, teachingGroupsError, privilegesError],
      checkLogin,
    );

    const onClick = (name: string) => {
      switch (session.value) {
        case SESSION_FILTER.BY_CLASS: {
          const classCode = name.split("-")[0];
          router.push(`/session/${session.value}/?classCode=${classCode}`);
          store.commit("updateQuery", { classCode });
          break;
        }
        case SESSION_FILTER.BY_GROUP: {
          router.push(`/session/${session.value}/?groupName=${name}`);
          store.commit("updateQuery", { groupName: name });
          break;
        }
        case SESSION_FILTER.BY_PRIVILEGE: {
          const link = `/session/${session.value}/?privilege=${privilege.value}&classCode=${name}`;
          router.push(link);
          break;
        }
      }
    };
    const isActive = (name: string) => {
      if (session.value === SESSION_FILTER.BY_GROUP) {
        return { "is-active": groupName.value === name };
      }
      return { "is-active": classCode.value === name };
    };

    const tabNames = computed(() => {
      switch (session.value) {
        case SESSION_FILTER.BY_CLASS: {
          return _(teachingClasses.value)
            .map((cls) => {
              const { classCode, subject } = cls;
              const { shortCode } = subject;
              return `${classCode}-${shortCode}`;
            })
            .sortedUniq()
            .value();
        }
        case SESSION_FILTER.BY_GROUP:
          return _(teachingGroups.value)
            .map("cohortGroupName")
            .sortedUniq()
            .value();
        case SESSION_FILTER.BY_PRIVILEGE: {
          const matchPrivilege = _.find(privileges.value, {
            privilegeName: privilege.value,
          });
          if (matchPrivilege) {
            return (matchPrivilege as Privilege).classCodes || [];
          }
          return [];
        }
        default:
          return [];
      }
    });

    return {
      tabNames,
      session,
      onClick,
      isActive,
    };
  },
});
</script>
