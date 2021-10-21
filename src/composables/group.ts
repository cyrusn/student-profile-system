import { useQuery, useResult } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { Ref } from "vue";
import { ApolloError } from "@apollo/client";
import _ from "lodash";
import { useStore } from "vuex";

export const useGroupNames = (): {
  groupNames: Ref<readonly string[]>;
  error: Ref<ApolloError | null>;
  onError: (fn: (param: ApolloError) => void) => {
    off: () => void;
  };
} => {
  const store = useStore();
  const schoolYear = store.state.schoolYear;
  const { result, error, onError } = useQuery(
    gql`
      query GroupNames($schoolYear: Int!) {
        cohortGroups(schoolYear: $schoolYear) {
          name
          schoolYear
        }
      }
    `,
    { schoolYear },
  );
  const groupNames = useResult(result, [], (data) => {
    return _.map(data.cohortGroups, "name") as string[];
  });
  return { groupNames, error, onError };
};
