import { computed, unref, Ref } from "vue";
import {
  Student,
  StudentGroup,
  studentsQuery,
  studentQuery,
  addStudentMutation,
  addGroupStudentMutation,
  removeGroupStudentMutation,
} from "@/graphql/student";
import {
  useQuery,
  useResult,
  useMutation,
  UseMutationReturn,
} from "@vue/apollo-composable";
import { teachingInfoQuery } from "@/graphql/teachingInfo";
import { ApolloError } from "@apollo/client";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { SESSION_FILTER } from "@/constant";
import _ from "lodash";

export const useStudent = (
  regno: Ref<string>,
): {
  student: Readonly<Ref<Readonly<Array<Student>>>>;
  error: Ref<ApolloError | null>;
  onError: (fn: (param: ApolloError) => void) => {
    off: () => void;
  };
} => {
  const variables = { regno };
  const { result, error, onError } = useQuery(studentQuery, variables);
  const student = useResult(result, [] as Student[], (data) => {
    return data.student as Student[];
  });

  return { student, error, onError };
};

export const useStudents = (): {
  students: Readonly<Ref<Readonly<Array<Student>>>>;
  error: Ref<ApolloError | null>;
  onError: (fn: (param: ApolloError) => void) => {
    off: () => void;
  };
} => {
  const store = useStore();
  const route = useRoute();
  const groupName = computed(() => route.query.groupName || "");
  const classCode = computed(() => route.query.classCode || "");
  const schoolYear = computed(() => store.state.schoolYear || null);
  const session = computed(() => route.params.session || "");

  const variables = {
    schoolYear,
    groupName,
    classCode,
  };

  const { result, error, onError } = useQuery(studentsQuery, variables);

  const students = useResult(result, [] as Student[], (data) => {
    if (unref(session) !== SESSION_FILTER.BY_GROUP) {
      return (data.classStudents || []) as Student[];
    } else {
      return (data.groupStudents || []) as Student[];
    }
  });

  return {
    students,
    onError,
    error,
  };
};

export const useAddStudent = (): UseMutationReturn<
  { addStudent: Student },
  {
    data: Student;
  }
> => {
  const store = useStore();
  const schoolYear = store.state.schoolYear;
  const classCode = store.state.query.classCode;
  const groupName = store.state.query.groupName;
  return useMutation(addStudentMutation, () => {
    return {
      refetchQueries: [
        {
          query: studentsQuery,
          variables: {
            schoolYear,
            classCode,
            groupName,
          },
        },
        {
          query: teachingInfoQuery,
          variables: {
            schoolYear,
          },
        },
      ],
    };
  });
};

export const useAddStudentToGroup = (): UseMutationReturn<
  { addGroupStudent: StudentGroup },
  {
    data: StudentGroup;
  }
> => {
  const store = useStore();
  const schoolYear = store.state.schoolYear;
  return useMutation(addGroupStudentMutation, {
    update: async (cache, _result, { variables }) => {
      cache.modify({
        fields: {
          groupStudents(students) {
            return _.reject(
              students,
              (student) => student.regno === variables?.data.regno,
            );
          },
        },
      });
    },
    refetchQueries: [
      {
        query: teachingInfoQuery,
        variables: {
          schoolYear,
        },
      },
    ],
  });
};

export const useRemoveStudentFromGroup = (): UseMutationReturn<
  { removeGroupStudent: StudentGroup },
  {
    data: StudentGroup;
  }
> => {
  const store = useStore();
  const schoolYear = store.state.schoolYear;
  return useMutation(removeGroupStudentMutation, {
    update: async (cache, _result, { variables }) => {
      cache.modify({
        fields: {
          groupStudents(students) {
            return _.reject(
              students,
              (student) => student.regno === variables?.data.regno,
            );
          },
        },
      });
    },
    refetchQueries: [
      {
        query: teachingInfoQuery,
        variables: {
          schoolYear,
        },
      },
    ],
  });
};
