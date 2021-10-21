<template>
  <div class="field">
    <label class="label">Set View As</label>
    <div class="field has-addons">
      <div class="control">
        <input
          class="input"
          type="text"
          v-model="userId"
          placeholder="userId"
          @keyup.enter="setViewAs"
        />
      </div>
      <div class="control">
        <button class="button" @click="onClick">Submit</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useUpdateViewAs } from "@/composables/user";
import { useAlertError, useAlertSuccessMessage } from "@/helper";
export default defineComponent({
  setup() {
    const userId = ref("");
    const { mutate: setViewAs, onError } = useUpdateViewAs();
    const TITLE = "setting viewAs";
    onError(useAlertError(TITLE));
    const alertMessage = useAlertSuccessMessage();

    const onClick = async () => {
      const result = await setViewAs({
        userId: userId.value,
      });

      const regno = result?.data?.viewAs;
      if (regno) {
        alertMessage(TITLE, `now you are viewing as ${regno}`);
      }
    };

    return { onClick, userId };
  },
});
</script>
