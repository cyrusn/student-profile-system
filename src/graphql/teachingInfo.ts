import gql from "graphql-tag";
export interface Subject {
  id: string;
  shortCode: string;
  ename: string;
  cname: string;
}

export interface TeachingClass {
  teachingId: string;
  subject: Subject;
  classCode: string;
}

export interface TeachingGroup {
  cohortGroupName: string;
  subject: Subject;
}

export interface Privilege {
  privilegeName: string;
  classCodes: string[];
}

export const teachingInfoQuery = gql`
  query TeachingInfo($schoolYear: Int!) {
    teachingClasses(schoolYear: $schoolYear) {
      teacherId
      subject {
        id
        shortCode
        ename
        cname
      }
      classCode
    }
    teachingGroups(schoolYear: $schoolYear) {
      cohortGroupName
      subject {
        id
        shortCode
        ename
        cname
      }
    }
    privileges(schoolYear: $schoolYear) {
      privilegeName
      classCodes
    }
  }
`;
