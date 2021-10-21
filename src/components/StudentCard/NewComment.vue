<template>
  <label class="menu-label">新評語</label>
  <div class="form">
    <div class="field">
      <div class="control">
        <div
          class="select"
          :class="!data.type && data.content ? 'is-danger' : ''"
        >
          <select v-model="data.type">
            <option value="">請選擇類別</option>
            <option v-for="(value, key) in options" :key="key" :value="value">
              {{ GetCommentTypeChineseName(value) }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <textarea
          :class="!data.content && data.type ? 'is-danger' : ''"
          class="textarea"
          placeholder="學生評語"
          rows="4"
          v-model="data.content"
          @keyup.ctrl.enter="onSave"
        ></textarea>
      </div>
    </div>
    <button :disabled="!isValid" class="button" @click="save(data)">
      儲存
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive } from "vue";
import { COMMENT_TYPE } from "@/graphql/comment";
import { useStore } from "vuex";
import { useCreateComments } from "@/composables/comment";
import { GetCommentTypeChineseName } from "@/graphql/comment";

export default defineComponent({
  props: {
    regno: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const data = reactive({
      type: "" as COMMENT_TYPE,
      content: "",
      regno: props.regno,
      schoolYear: store.state.schoolYear,
    });
    const isValid = computed(() => data.content && data.type);
    const isActive = ref(false);
    const options = computed(() => {
      return Object.keys(COMMENT_TYPE);
    });

    const reset = () => {
      data.type = "" as COMMENT_TYPE;
      data.content = "";
    };

    const { mutate: save, error } = useCreateComments(data);

    const onSave = () => {
      save();
      reset();
    };
    if (error.value) {
      console.error(error.value);
    }

    return {
      isValid,
      options,
      data,
      isActive,
      onSave,
      GetCommentTypeChineseName,
    };
  },
});
</script>
