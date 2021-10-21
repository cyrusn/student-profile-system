import { gql } from "graphql-tag";

export const loginCredential = gql`
  query Credential {
    credential {
      email_verified
      email
      name
      given_name
      family_name
    }
  }
`;

export const loginMutation = gql`
  mutation Login($credentialResponse: CredentialResponse) {
    login(credentialResponse: $credentialResponse)
  }
`;

export const logoutMutation = gql`
  mutation Logout($uuid: String) {
    logout(uuid: $uuid)
  }
`;
