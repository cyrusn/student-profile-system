import {
  Comment,
  COMMENT_TYPE,
  commentsByRegnosInCohortQuery,
  createCommentMutation,
  deleteCommentMutation,
  commentsByRegnoQuery,
} from "@/graphql/comment";
import {
  useQuery,
  useResult,
  useMutation,
  UseMutationReturn,
} from "@vue/apollo-composable";
import { computed, Ref } from "vue";
import _, { groupBy, map } from "lodash";
import { useStore } from "vuex";
import { ApolloError } from "@apollo/client";
import { Student } from "@/graphql/student";

export const useStudentComments = (
  regno: Ref<string>,
): {
  studentComments: Ref<{ [key: number]: Comment[] }>;
  error: Ref<ApolloError | null>;
  onError: (fn: (param: ApolloError) => void) => {
    off: () => void;
  };
} => {
  const store = useStore();
  const schoolYear = computed(() => store.state.schoolYear);
  const variables = {
    schoolYear,
    regno,
  };
  const { result, error, onError } = useQuery(commentsByRegnoQuery, variables);
  const studentComments = useResult(result, [], (data) => {
    return _.groupBy(data?.studentComments, "schoolYear");
  });

  return { studentComments, error, onError };
};

/**
 *  return comments grouped by regno
 */
export const useComments = (
  students: Ref<Student[]>,
): {
  commentsByRegno: Ref<{ [key: string]: Comment[] }>;
  error: Ref<ApolloError | null>;
  onError: (fn: (param: ApolloError) => void) => {
    off: () => void;
  };
} => {
  const store = useStore();
  const regnos = computed(() => map(students.value, "regno"));
  store.commit("updateRegnos", regnos);
  const schoolYear = computed(() => store.state.schoolYear);

  const variables = {
    regnos,
    schoolYear,
  };
  const { result, error, onError } = useQuery(
    commentsByRegnosInCohortQuery,
    variables,
  );

  const commentsByRegno = useResult(result, [], (data) => {
    return groupBy(data.comments, "regno");
  }) as Ref<{ [key: string]: Comment[] }>;

  return { commentsByRegno, error, onError };
};

export type CreateCommentInputType = {
  regno: string;
  content: string;
  schoolYear: number;
  type: COMMENT_TYPE;
};

export const useCreateComments = (
  data: CreateCommentInputType,
): UseMutationReturn<
  { createComment: Comment },
  { data: CreateCommentInputType }
> => {
  const store = useStore();
  const regnos = store.state.regnos;
  const regno = store.state.selectedRegno;
  const schoolYear = store.state.schoolYear;
  return useMutation(createCommentMutation, () => {
    return {
      variables: { data },
      refetchQueries: [
        {
          query: commentsByRegnosInCohortQuery,
          variables: {
            regnos,
            schoolYear,
          },
        },
        {
          query: commentsByRegnoQuery,
          variables: {
            regno,
            schoolYear,
          },
        },
      ],
    };
  });
};

export const useDeleteCommentMutation = (
  commentId: Ref<number>,
): UseMutationReturn<{ deleteComment: Comment }, { commentId: number }> => {
  const store = useStore();
  const regnos = store.state.regnos;
  const regno = store.state.selectedRegno;
  const schoolYear = store.state.schoolYear;
  return useMutation(deleteCommentMutation, () => {
    return {
      variables: {
        commentId: commentId.value,
      },
      refetchQueries: [
        {
          query: commentsByRegnosInCohortQuery,
          variables: {
            regnos,
            schoolYear,
          },
        },
        {
          query: commentsByRegnoQuery,
          variables: {
            regno,
            schoolYear,
          },
        },
      ],
    };
  });
};
