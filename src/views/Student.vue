<template>
  <div>
    <h1 class="title">學生歷年評語</h1>
    <div class="box" v-for="(student, key) in cohortStudents" :key="key">
      <div class="media">
        <StudentPhoto :student="student" />
        <div class="media-content">
          <StudentData :student="student" />
          <div class="block">
            <h2 class="subtitle">{{ student.schoolYear }}</h2>
            <CommentBlock
              :comments="commentsBySchoolYear[student.schoolYear]"
              :regno="regno"
            />
          </div>
        </div>
      </div>
      <NewComment
        :regno="regno"
        v-if="isCreateNewComment && student.schoolYear == schoolYear"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStudentComments } from "@/composables/comment";
import { useStudent } from "@/composables/student";
import CommentBlock from "@/components/StudentCard/CommentBlock.vue";
import NewComment from "@/components/StudentCard/NewComment.vue";
import StudentPhoto from "@/components/StudentCard/StudentPhoto.vue";
import StudentData from "@/components/StudentCard/StudentData.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: { CommentBlock, NewComment, StudentData, StudentPhoto },
  setup() {
    const route = useRoute();
    const store = useStore();
    onMounted(() => {
      store.commit("updateSelectedRegno", route.params.regno);
    });

    const regno = computed(() => route.params.regno as string);
    const schoolYear = computed(() => store.state.schoolYear);
    const { student: cohortStudents } = useStudent(regno);

    const { studentComments: commentsBySchoolYear } = useStudentComments(regno);
    const isCreateNewComment = computed(() => store.state.isCreateNewComment);

    return {
      cohortStudents,
      regno,
      commentsBySchoolYear,
      isCreateNewComment,
      schoolYear,
    };
  },
});
</script>
