import { Ref, computed } from "vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import {
  teachingInfoQuery,
  Privilege,
  TeachingClass,
  TeachingGroup,
} from "@/graphql/teachingInfo";
import { useStore } from "vuex";
import { ApolloError } from "@apollo/client";

export const useTeachingClasses = (): {
  teachingClasses: Ref<TeachingClass[]>;
  error: Ref<ApolloError | null>;
  onError: (fn: (param: ApolloError) => void) => {
    off: () => void;
  };
} => {
  const store = useStore();
  const schoolYear = computed(() => store.state.schoolYear);
  const { result, error, onError } = useQuery(teachingInfoQuery, {
    schoolYear,
  });
  const teachingClasses = useResult(
    result,
    [],
    (data) => data.teachingClasses,
  ) as Ref<TeachingClass[]>;

  return { teachingClasses, error, onError };
};

export const useTeachingGroups = (): {
  teachingGroups: Ref<TeachingGroup[]>;
  error: Ref<ApolloError | null>;
  onError: (fn: (param: ApolloError) => void) => {
    off: () => void;
  };
} => {
  const store = useStore();
  const schoolYear = computed(() => store.state.schoolYear);
  const { result, error, onError } = useQuery(teachingInfoQuery, {
    schoolYear,
  });
  const teachingGroups = useResult(
    result,
    [],
    (data) => data.teachingGroups,
  ) as Ref<TeachingGroup[]>;

  return { teachingGroups, error, onError };
};

export const usePrivileges = (): {
  privileges: Ref<Privilege[]>;
  error: Ref<ApolloError | null>;
  onError: (fn: (param: ApolloError) => void) => {
    off: () => void;
  };
} => {
  const store = useStore();
  const schoolYear = computed(() => store.state.schoolYear);
  const { result, error, onError } = useQuery(teachingInfoQuery, {
    schoolYear,
  });
  const privileges = useResult(result, [], (data) => data.privileges) as Ref<
    Privilege[]
  >;
  return {
    privileges,
    error,
    onError,
  };
};
