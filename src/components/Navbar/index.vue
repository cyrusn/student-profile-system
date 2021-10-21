<template>
  <nav id="nav" class="navbar is-light is-fixed-top">
    <div class="navbar-brand is-size-5">
      <router-link class="navbar-item" to="/session/byClass">
        聖公會李炳中學</router-link
      >
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start" v-if="userId">
        <router-link v-if="isAdmin" class="navbar-item" to="/admin"
          >管理</router-link
        >
        <template v-if="isTeacher">
          <session-selector
            v-for="(session, key) in sessions"
            :key="key"
            :session="session"
          />
        </template>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="tags has-addons">
            <span class="icon-text tag is-link">
              <span class="icon">
                <font-awesome-icon :icon="['fas', 'user']" />
              </span>
              <span>{{ viewAs || userId || loginUserId || "請登入" }}</span>
            </span>
            <logout class="tag is-danger" />
          </div>
        </div>
        <template v-if="isTeacher">
          <div class="navbar-item">
            <button
              class="button"
              :class="isCreateNewComment ? 'is-success' : ' is-warning'"
              @click="toggleIsCreateNewComment"
            >
              {{ isCreateNewComment ? "隱藏新評語" : "填寫新評語" }}
            </button>
          </div>
          <cohort-selector />
        </template>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, computed, watch, onMounted } from "vue";
import { useStore } from "vuex";
import CohortSelector from "@/components/Navbar/CohortSelector.vue";
import SessionSelector from "@/components/Navbar/SessionSelector.vue";
import { useTeacherAndUser } from "@/composables/user";
import Logout from "@/components/Navbar/Logout.vue";
import {
  useTeachingClasses,
  useTeachingGroups,
  usePrivileges,
} from "@/composables/teachingInfo";
import { SESSION_FILTER } from "@/constant";
import { ROLE } from "@/graphql/teacherAndUser";
import { useCheckLogin, useCredential } from "@/composables/auth";

export default defineComponent({
  components: { CohortSelector, SessionSelector, Logout },
  setup() {
    const store = useStore();
    const isCreateNewComment = computed(() => store.state.isCreateNewComment);

    const toggleIsCreateNewComment = () => {
      store.commit("toggleIsCreateNewComment");
    };
    const { user, teacher, onError } = useTeacherAndUser();
    const checkLogin = useCheckLogin();
    onError(checkLogin);
    onMounted(checkLogin);
    const { credential } = useCredential();
    const loginUserId = computed(() => credential.value?.email.split("@")[0]);
    const userId = computed(() => user.value?.id);
    const viewAs = computed(() => teacher.value?.teacherId);
    const roles = computed(() => user.value?.roles || ([] as ROLE[]));
    const isAdmin = computed(() => roles.value.includes(ROLE.ADMIN) || false);
    const isTeacher = computed(() => {
      return roles.value.includes(ROLE.TEACHER) || false;
    });

    const { teachingClasses, error: teachingClassesError } =
      useTeachingClasses();
    const { teachingGroups, error: teachingGroupsError } = useTeachingGroups();
    const { privileges, error: privilegesError } = usePrivileges();

    watch([teachingClassesError, teachingGroupsError, privilegesError], () => {
      checkLogin();
    });

    const sessions = computed(() => {
      return Object.values(SESSION_FILTER).filter((session) => {
        switch (session) {
          case SESSION_FILTER.BY_CLASS:
            return teachingClasses.value?.length > 0;
          case SESSION_FILTER.BY_GROUP:
            return teachingGroups.value?.length > 0;
          case SESSION_FILTER.BY_PRIVILEGE:
            return privileges.value?.length > 0;
        }
      });
    });

    return {
      userId,
      viewAs,
      loginUserId,
      isAdmin,
      isTeacher,
      sessions,
      isCreateNewComment,
      toggleIsCreateNewComment,
    };
  },
});
</script>
