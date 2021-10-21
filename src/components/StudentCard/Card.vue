<template>
  <div class="box" v-if="student">
    <div class="media">
      <StudentPhoto :student="student" @click="goto(student.regno)" />
      <div class="media-content">
        <div class="block">
          <StudentData :student="student" @click="goto(student.regno)" />
          <CommentBlock :comments="comments" :regno="student.regno" />
          <NewComment :regno="student.regno" v-if="isCreateNewComment" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { useStore } from "vuex";
import { Student } from "@/graphql/student";
import { Comment } from "@/graphql/comment";

import StudentPhoto from "@/components/StudentCard/StudentPhoto.vue";
import CommentBlock from "@/components/StudentCard/CommentBlock.vue";
import NewComment from "@/components/StudentCard/NewComment.vue";
import StudentData from "@/components/StudentCard/StudentData.vue";
import { useRouter } from "vue-router";
export default defineComponent({
  props: {
    student: {
      type: Object as PropType<Student>,
      required: true,
    },
    comments: Array as PropType<Comment[]>,
  },
  components: { CommentBlock, NewComment, StudentData, StudentPhoto },
  setup() {
    const store = useStore();
    const isCreateNewComment = computed(() => store.state.isCreateNewComment);
    const router = useRouter();

    const goto = (regno: string) => {
      router.push({
        path: `/student/${regno}`,
      });
    };

    return { isCreateNewComment, goto };
  },
});
</script>
