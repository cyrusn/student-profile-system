import {
  UseMutationReturn,
  useMutation,
  useQuery,
  useResult,
} from "@vue/apollo-composable";
import { useStore } from "vuex";
import { Ref } from "vue";
import { loginMutation, logoutMutation, loginCredential } from "@/graphql/auth";
import { teachingInfoQuery } from "@/graphql/teachingInfo";
import { teacherAndUserQuery } from "@/graphql/teacherAndUser";
import { useTeacherAndUser } from "@/composables/user";
import { ApolloError } from "@apollo/client";
import { useRoute, useRouter } from "vue-router";

export interface CredentialResponse {
  clientId?: string;
  credential: string;
  select_by?: string;
}
interface Credential {
  email_verified: boolean;
  email: string;
  name: string;
  given_name: string;
  family_name: string;
}

export const useCredential = (): {
  credential: Ref<Credential | null>;
  error: Ref<ApolloError | null>;
  onError: (fn: (param: ApolloError) => void) => {
    off: () => void;
  };
} => {
  const { result, error, onError } = useQuery(loginCredential);
  const credential = useResult(
    result,
    null,
    (data) => data.credential as Credential,
  );
  return { credential, error, onError };
};

export const useCheckLogin = (): (() => void) => {
  const route = useRoute();
  const router = useRouter();
  const { user } = useTeacherAndUser();
  return (): void => {
    if (!user.value && route.path !== "/login") {
      router.push("/login");
    }
  };
};

export const useLogin = (
  credentialResponse: CredentialResponse,
): UseMutationReturn<
  { login: string },
  { credentialResponse: CredentialResponse }
> => {
  const store = useStore();
  const schoolYear = store.state.schoolYear;
  return useMutation(loginMutation, () => {
    return {
      variables: { credentialResponse },
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
        { query: loginCredential },
      ],
    };
  });
};

export const useLogout = (): UseMutationReturn<
  { logout: string },
  { uuid: string }
> => {
  const store = useStore();
  const schoolYear = store.state.schoolYear;
  return useMutation(logoutMutation, () => {
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
        { query: loginCredential },
      ],
    };
  });
};
