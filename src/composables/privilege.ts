import {
  useMutation,
  UseMutationReturn,
  useQuery,
  useResult,
} from "@vue/apollo-composable";
import { teachingInfoQuery } from "@/graphql/teachingInfo";
import {
  cohortPrivilegesQuery,
  CohortPrivilegeTeacher,
  addPrivilegeTeacherMutation,
  removePrivilegeTeacherMutation,
} from "@/graphql/privilege";
import { useStore } from "vuex";
import { Ref } from "vue";
import { ApolloError } from "@apollo/client";
import _ from "lodash";

export const useTeacherPrivileges = (): {
  privilegeNames: Ref<string[]>;
  error: Ref<ApolloError | null>;
  onError: (fn: (param: ApolloError) => void) => {
    off: () => void;
  };
} => {
  const store = useStore();
  const schoolYear = store.state.schoolYear;
  const { result, error, onError } = useQuery(teachingInfoQuery, {
    schoolYear,
  });
  const privilegeNames = useResult(result, [], (data) => {
    return _.map(data.privileges, "privilegeName");
  }) as Ref<string[]>;

  return { privilegeNames, error, onError };
};

export const usePrivilegeNames = (): {
  privilegeNames: Ref<string[]>;
  error: Ref<ApolloError | null>;
  onError: (fn: (param: ApolloError) => void) => {
    off: () => void;
  };
} => {
  const store = useStore();
  const schoolYear = store.state.schoolYear;
  const { result, error, onError } = useQuery(cohortPrivilegesQuery, {
    schoolYear,
  });

  const privilegeNames = useResult(result, [], (data) => {
    return _.map(data.cohortPrivileges, "privilegeName");
  }) as Ref<string[]>;

  return { privilegeNames, error, onError };
};

export const useAddPrivilegeTeacher = (): UseMutationReturn<
  { addPrivilegeTeacher: CohortPrivilegeTeacher },
  {
    data: CohortPrivilegeTeacher;
  }
> => {
  const store = useStore();
  const schoolYear = store.state.schoolYear;
  return useMutation(addPrivilegeTeacherMutation, {
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
export const useRemovePrivilegeTeacher = (): UseMutationReturn<
  { removePrivilegeTeacher: CohortPrivilegeTeacher },
  {
    data: CohortPrivilegeTeacher;
  }
> => {
  const store = useStore();
  const schoolYear = store.state.schoolYear;
  return useMutation(removePrivilegeTeacherMutation, {
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
