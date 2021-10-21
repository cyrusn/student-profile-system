import { useQuery, useResult } from "@vue/apollo-composable";
import { schoolYearQuery } from "@/graphql/schoolYear";
import { ApolloError } from "@apollo/client";
import { Ref } from "vue";

export const useSchoolYears = (): {
  schoolYears: Ref<readonly number[]>;
  error: Ref<ApolloError | null>;
  onError: (fn: (param: ApolloError) => void) => {
    off: () => void;
  };
} => {
  const { result, error, onError } = useQuery(schoolYearQuery);

  const schoolYears = useResult(
    result,
    [] as number[],
    (data) => data.schoolYears as number[],
  );
  return {
    schoolYears,
    onError,
    error,
  };
};
