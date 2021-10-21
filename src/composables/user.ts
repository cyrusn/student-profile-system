import {
  useQuery,
  useResult,
  UseMutationReturn,
  useMutation,
} from "@vue/apollo-composable";
import { ApolloError } from "@apollo/client";
import {
  teacherAndUserQuery,
  Teacher,
  User,
  updateViewAsMutation,
  removeStudentUserQuery,
} from "@/graphql/teacherAndUser";
import { teachingInfoQuery } from "@/graphql/teachingInfo";
import { useStore } from "vuex";
import { Ref, computed } from "vue";
import _, { reject } from "lodash";

interface TResult {
  teacher: Ref<Teacher | null>;
  user: Ref<User | null>;
  viewAs: Ref<User | null>;
  error: Ref<ApolloError | null>;
  onError: (fn: (param: ApolloError) => void) => {
    off: () => void;
  };
}

export const useTeacherAndUser = (): TResult => {
  const store = useStore();
  const schoolYear = computed(() => store.state.schoolYear);
  const { result, onError, error } = useQuery(teacherAndUserQuery, {
    schoolYear,
  });
  const teacher = useResult(result, null, (data) => data.teacher as Teacher);
  const user = useResult(result, null, (data) => data.user as User);
  const viewAs = useResult(result, null, (data) => {
    const roles = data.user.roles;
    return Object.assign({}, data.user, data.viewAs, { roles }) as User;
  });

  return { teacher, viewAs, user, error, onError };
};

export const useUpdateViewAs = (): UseMutationReturn<
  { viewAs: string },
  { userId: string }
> => {
  const store = useStore();
  const schoolYear = store.state.schoolYear;
  return useMutation(updateViewAsMutation, () => {
    return {
      refetchQueries: [
        {
          query: teacherAndUserQuery,
          variables: {
            schoolYear,
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

export const useRemoveStudentUser = (): UseMutationReturn<
  {
    removeStudentUser: User;
  },
  { regno: string }
> => {
  const store = useStore();
  const schoolYear = store.state.schoolYear;
  return useMutation(removeStudentUserQuery, () => {
    return {
      update: async (cache, _result, { variables }) => {
        cache.modify({
          fields: {
            classStudents(students) {
              return _.reject(
                students,
                (student) => student.regno === variables?.regno,
              );
            },
            groupStudents(students) {
              return _.reject(
                students,
                (student) => student.regno === variables?.regno,
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
    };
  });
};
