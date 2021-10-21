import { gql } from "graphql-tag";
export enum ROLE {
  ADMIN = "ADMIN",
  PRINCIPAL = "PRINCIPAL",
  DISCIPLINE = "DISCIPLINE",
  GUIDANCE = "GUIDANCE",
  CAREER = "CAREER",
  ECA = "ECA",
  TEACHER = "TEACHER",
  PREFECT = "PREFECT",
  STUDENT = "STUDENT",
}

export enum STATUS {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DEPARTED = "DEPARTED",
}

export interface Teacher {
  teacherId: string;
  ename: string;
  cname: string;
  title: string;
}

export interface User {
  id: string;
  status: STATUS;
  roles: ROLE[];
}

export const teacherAndUserQuery = gql`
  query TeacherAndUser($schoolYear: Int!) {
    teacher(schoolYear: $schoolYear) {
      teacherId
      ename
      cname
      title
    }

    viewAs {
      id
      status
      roles
    }

    user {
      id
      status
      roles
    }
  }
`;

export const updateViewAsMutation = gql`
  mutation ViewAs($userId: String) {
    viewAs(userId: $userId)
  }
`;

export const removeStudentUserQuery = gql`
  mutation RemoveStudentUser($regno: String!) {
    removeStudentUser(regno: $regno) {
      id
      status
      roles
    }
  }
`;
