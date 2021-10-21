import { gql } from "graphql-tag";

export interface CohortPrivilege {
  schoolYear: number;
  privilegeName: string;
}

export interface CohortPrivilegeTeacher extends CohortPrivilege {
  teacherId: string;
}

export const cohortPrivilegesQuery = gql`
  query CohortPrivileges($schoolYear: Int!) {
    cohortPrivileges(schoolYear: $schoolYear) {
      schoolYear
      privilegeName
    }
  }
`;

export const addPrivilegeTeacherMutation = gql`
  mutation AddPrivilegeTeacher($data: CohortPrivilegeTeacherInputType) {
    addPrivilegeTeacher(data: $data) {
      schoolYear
      privilegeName
      teacherId
    }
  }
`;

export const removePrivilegeTeacherMutation = gql`
  mutation RemovePrivilegeTeacher($data: CohortPrivilegeTeacherInputType) {
    removePrivilegeTeacher(data: $data) {
      schoolYear
      privilegeName
      teacherId
    }
  }
`;
