import { useQuery, useResult } from "@vue/apollo-composable";
import { ApolloError } from "@apollo/client";
import { Ref } from "vue";
import gql from "graphql-tag";

interface TResult {
  ok: Ref<boolean | null>;
  error: Ref<ApolloError | null>;
  onError: (fn: (param: ApolloError) => void) => {
    off: () => void;
  };
}

const connectionQuery = gql`
  query Connection {
    ok
  }
`;

export const useConnection = (): TResult => {
  const { result, error, onError } = useQuery(connectionQuery, {
    pollInterval: 1000,
  });
  const ok = useResult(result, false, (data) => data.ok as boolean);
  return { ok, error, onError };
};
