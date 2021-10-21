<template>
  <div v-for="(list, name) in contentsGroupedByType" :key="name">
    <div class="menu">
      <p class="menu-label">{{ GetCommentTypeChineseName(name) }}</p>
      <ul class="menu-list">
        <li v-for="(c, key) in list" :key="key">
          <ul class="menu-list">
            <li>
              <span class="has-text-link has-text-weight-semibold">
                {{ `${c.createdBy}: ` }}</span
              >
              {{ c.content }}
              <span class="tag"
                >{{ new Date(c.updatedAt).toLocaleDateString() }}
                <button
                  class="delete ml-2"
                  @click="deleteComment(c.commentId)"
                  v-if="c.createdBy === teacher?.teacherId"
                ></button>
              </span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, watch } from "vue";
import { Comment } from "@/graphql/comment";
import { groupBy } from "lodash";
import { useTeacherAndUser } from "@/composables/user";
import { useDeleteCommentMutation } from "@/composables/comment";
import { GetCommentTypeChineseName } from "@/graphql/comment";

export default defineComponent({
  props: {
    comments: Array as PropType<Comment[]>,
    regno: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const { teacher } = useTeacherAndUser();
    const commentId = ref(0);
    const contentsGroupedByType = computed(() => {
      return groupBy(props.comments, "type");
    });

    const { mutate } = useDeleteCommentMutation(commentId);

    watch(commentId, () => {
      mutate();
    });

    const deleteComment = (id: number) => {
      commentId.value = id;
    };

    return {
      contentsGroupedByType,
      teacher,
      deleteComment,
      GetCommentTypeChineseName,
    };
  },
});
</script>
