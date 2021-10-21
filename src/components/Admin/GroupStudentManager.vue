<template>
  <div class="field">
    <label class="label">Add Student Group / Remove Student From Group</label>
    <div class="field is-grouped">
      <div class="control">
        <input
          class="input"
          type="text"
          v-model="data.regno"
          placeholder="regno"
        />
      </div>
      <div class="control">
        <div class="select">
          <select v-model="data.cohortGroupName">
            <option value="" disabled>Group</option>
            <option :value="name" v-for="(name, key) in groupNames" :key="key">
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
import { StudentGroup } from "@/graphql/student";
import {
  useAddStudentToGroup,
  useRemoveStudentFromGroup,
} from "@/composables/student";
import { useGroupNames } from "@/composables/group";
import { useStore } from "vuex";
import { useAlertError, useAlertSuccessMessage } from "@/helper";

export default defineComponent({
  setup() {
    const { mutate: add2Group, onError: onAddError } = useAddStudentToGroup();
    const { mutate: removeFromGroup, onError: onRemoveError } =
      useRemoveStudentFromGroup();
    const { groupNames } = useGroupNames();

    const ADD_TITLE = "adding student to a group";
    const REMOVE_TITLE = "removing student to a group";
    onAddError(useAlertError(ADD_TITLE));
    onRemoveError(useAlertError(REMOVE_TITLE));
    const alertMessage = useAlertSuccessMessage();

    const store = useStore();
    const data = reactive({
      schoolYear: store.state.schoolYear,
      regno: "",
      cohortGroupName: "",
    } as StudentGroup);

    const onAdd = async () => {
      const result = await add2Group({ data });
      const studentGroup = result?.data?.addGroupStudent;
      if (studentGroup) {
        const { regno, cohortGroupName } = studentGroup;
        alertMessage(ADD_TITLE, `${regno} is added to ${cohortGroupName}`);
      }
    };

    const onRemove = async () => {
      const result = await removeFromGroup({ data });
      const studentGroup = result?.data;
      if (studentGroup) {
        const { regno, cohortGroupName } = studentGroup.removeGroupStudent;
        alertMessage(
          REMOVE_TITLE,
          `${regno} is removed from ${cohortGroupName}`,
        );
      }
    };

    return {
      data,
      groupNames,
      onAdd,
      onRemove,
    };
  },
});
</script>
