<template>
  <div class="home mb-6">
    <AlertModal />
    <h1 class="title">Admin</h1>
    <ViewAs />
    <hr />
    <PrivilegeManager />
    <hr />
    <NewStudent />
    <hr />
    <GroupStudentManger />
    <hr />
    <RemoveStudentUser />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ViewAs from "@/components/Admin/ViewAs.vue";
import NewStudent from "@/components/Admin/NewStudent.vue";
import GroupStudentManger from "@/components/Admin/GroupStudentManager.vue";
import PrivilegeManager from "@/components/Admin/PrivilegeManager.vue";
import RemoveStudentUser from "@/components/Admin/RemoveStudentUser.vue";
import AlertModal from "@/components/Admin/AlertModal.vue";

export default defineComponent({
  components: {
    ViewAs,
    NewStudent,
    PrivilegeManager,
    GroupStudentManger,
    RemoveStudentUser,
    AlertModal,
  },
});
</script>
