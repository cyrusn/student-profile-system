<template>
  <div class="field">
    <label class="label">Remove Student User</label>
    <div class="field has-addons">
      <div class="control">
        <input class="input" type="text" v-model="regno" placeholder="regno" />
      </div>
      <div class="control">
        <button class="button is-danger" @click="onClick">Remove</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRemoveStudentUser } from "@/composables/user";
import { useAlertError, useAlertSuccessMessage } from "@/helper";

export default defineComponent({
  setup() {
    const regno = ref("");
    const { mutate: removeStudent, onError } = useRemoveStudentUser();
    const TITLE = "removing student user";
    const alertMessage = useAlertSuccessMessage();
    onError(useAlertError(TITLE));

    const onClick = async () => {
      const result = await removeStudent({
        regno: regno.value,
      });
      const user = result?.data?.removeStudentUser;
      if (user) {
        const id = user?.id;
        alertMessage(TITLE, `${id} is deleted`);
      }
    };

    return { regno, onClick };
  },
});
</script>
