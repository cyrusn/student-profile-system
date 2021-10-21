import gql from "graphql-tag";

export enum SEX {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHERS = "OTHERS",
}

export enum HOUSE {
  BLUE = "BLUE",
  GREEN = "GREEN",
  RED = "RED",
  YELLOW = "YELLOW",
}

export enum SEN_TYPE {
  SPECIFIC_LEARNING_DIFFICULTIES,
  INTELLECTUAL_DISABILITY,
  AUTISM_SPECTRUM_DISORDERS,
  ATTENTION_DEFICIT_HYPERACTIVITY,
  PHYSICAL_DISABILITY,
  VISUAL_IMPAIRMENT,
  HEARING_IMPAIRMENT,
  SPEECH_AND_LANGUAGE_IMPAIRMENT,
  MENTAL_ILLNESS,
  OTHERS,
}

export interface Student {
  regno: string;
  classCode: string;
  classNumber?: number;
  cname?: string;
  ename: string;
  sex: SEX;
  house: HOUSE;
  senTypes: SEN_TYPE[];
  schoolYear: number;
}

export interface ClassStudentsVariables {
  schoolYear: number;
  classCode: string;
}

export interface StudentGroup {
  regno: string;
  schoolYear: number;
  cohortGroupName: string;
}

export const studentFragment = gql`
  fragment studentFields on CohortStudent {
    regno
    classCode
    classNumber
    ename
    cname
    sex
    house
    senTypes
    schoolYear
  }
`;

export const groupStudentFragment = gql`
  fragment groupStudentFields on CohortGroupStudent {
    regno
    schoolYear
    cohortGroupName
  }
`;

export const studentQuery = gql`
  query Student($regno: String!) {
    student(regno: $regno) {
      ...studentFields
    }
  }
  ${studentFragment}
`;

export const studentsQuery = gql`
  query Students($schoolYear: Int!, $classCode: String!, $groupName: String!) {
    classStudents(schoolYear: $schoolYear, classCode: $classCode) {
      ...studentFields
    }
    groupStudents(schoolYear: $schoolYear, groupName: $groupName) {
      ...studentFields
    }
  }
  ${studentFragment}
`;

export const addStudentMutation = gql`
  mutation AddStudent($data: Student) {
    addStudent(data: $data) {
      ...studentFields
    }
  }
  ${studentFragment}
`;

export const addGroupStudentMutation = gql`
  mutation AddGroupStudent($data: CohortGroupStudentInputType) {
    addGroupStudent(data: $data) {
      ...groupStudentFields
    }
  }
  ${groupStudentFragment}
`;

export const removeGroupStudentMutation = gql`
  mutation RemoveGroupStudent($data: CohortGroupStudentInputType) {
    removeGroupStudent(data: $data) {
      ...groupStudentFields
    }
  }
  ${groupStudentFragment}
`;
