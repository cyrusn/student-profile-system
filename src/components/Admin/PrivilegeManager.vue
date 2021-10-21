<template>
  <div class="field">
    <label class="label"
      >Add Teacher Privilege / Remove Teacher From Privilege</label
    >
    <div class="field is-grouped">
      <div class="control">
        <input
          class="input"
          type="text"
          v-model="data.teacherId"
          placeholder="teacherId"
        />
      </div>
      <div class="control">
        <div class="select">
          <select v-model="data.privilegeName">
            <option value="" disabled>Privilege Name</option>
            <option
              :value="name"
              v-for="(name, key) in privilegeNames"
              :key="key"
            >
              {{ name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <button class="button is-info" @click="onAdd">Add</button>
      </div>
      <div class="control">
        <button class="button is-danger" @click="onRemove">Remove</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import {
  usePrivilegeNames,
  useAddPrivilegeTeacher,
  useRemovePrivilegeTeacher,
} from "@/composables/privilege";
import { useStore } from "vuex";
import { useAlertError, useAlertSuccessMessage } from "@/helper";
import { CohortPrivilegeTeacher } from "@/graphql/privilege";

export default defineComponent({
  setup() {
    const { mutate: add2Privilege, onError: onAddError } =
      useAddPrivilegeTeacher();

    const { mutate: removeFromPrivilege, onError: onRemoveError } =
      useRemovePrivilegeTeacher();

    const { privilegeNames, onError: onGetPrivileges } = usePrivilegeNames();
    const ADD_TITLE = "adding student to a group";
    const REMOVE_TITLE = "removing student to a group";

    onGetPrivileges(useAlertError("retrieving privileges"));
    onAddError(useAlertError(ADD_TITLE));
    onRemoveError(useAlertError(REMOVE_TITLE));
    const alertMessage = useAlertSuccessMessage();

    const store = useStore();
    const data = reactive({
      schoolYear: store.state.schoolYear,
      teacherId: "",
      privilegeName: "",
    } as CohortPrivilegeTeacher);

    const onAdd = async () => {
      const result = await add2Privilege({ data });
      const cohortPrivilegeTeacher = result?.data?.addPrivilegeTeacher;
      if (cohortPrivilegeTeacher) {
        const { teacherId, privilegeName } = cohortPrivilegeTeacher;
        alertMessage(
          ADD_TITLE,
          `${teacherId} now has privilege to view ${privilegeName} students`,
        );
      }
    };

    const onRemove = async () => {
      const result = await removeFromPrivilege({ data });
      const cohortPrivilegeTeacher = result?.data?.removePrivilegeTeacher;
      if (cohortPrivilegeTeacher) {
        const { teacherId, privilegeName } = cohortPrivilegeTeacher;
        alertMessage(
          REMOVE_TITLE,
          `${teacherId} now is removed from ${privilegeName} privilege.`,
        );
      }
    };

    return {
      data,
      privilegeNames,
      onAdd,
      onRemove,
    };
  },
});
</script>
