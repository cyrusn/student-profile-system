import { gql } from "graphql-tag";

export enum COMMENT_TYPE {
  LEARNING_TRAIT = "LEARNING_TRAIT",
  FAMILY_BACKGROUND = "FAMILY_BACKGROUND",
  CLASSROOM_BEHAVIOUR = "CLASSROOM_BEHAVIOUR",
  PEER_RELATIONSHIP = "PEER_RELATIONSHIP",
  COUNSELLING = "COUNSELLING",
  DISCIPLINE = "DISCIPLINE",
  LIFE_PLANNING = "LIFE_PLANNING",
  OTHERS = "OTHERS",
}

export interface Comment {
  commentId: string;
  regno: string;
  schoolYear: number;
  content: string;
  createdBy: string;
  updatedAt: Date;
  type: COMMENT_TYPE;
}

export const GetCommentTypeChineseName = (type: COMMENT_TYPE): string => {
  const commentTypeChineseNameMapper = {
    LEARNING_TRAIT: "學習",
    FAMILY_BACKGROUND: "家庭",
    CLASSROOM_BEHAVIOUR: "課堂表現",
    PEER_RELATIONSHIP: "朋輩關係",
    COUNSELLING: "輔導",
    DISCIPLINE: "訓導",
    LIFE_PLANNING: "生涯規劃",
    OTHERS: "其他",
  };

  return commentTypeChineseNameMapper[type];
};

export const commentsByRegnoQuery = gql`
  query StudentComments($regno: String!, $schoolYear: Int!) {
    studentComments(regno: $regno, schoolYear: $schoolYear) {
      commentId
      regno
      relatedRegnos
      schoolYear
      createdBy
      updatedAt
      type
      content
    }
  }
`;

export const commentsByRegnosInCohortQuery = gql`
  query Comment($schoolYear: Int!, $regnos: [String!]!) {
    comments(schoolYear: $schoolYear, regnos: $regnos) {
      commentId
      schoolYear
      content
      createdBy
      updatedAt
      type
      regno
    }
  }
`;

export const deleteCommentMutation = gql`
  mutation DeleteComment($commentId: Int!) {
    deleteComment(commentId: $commentId) {
      commentId
    }
  }
`;

export const createCommentMutation = gql`
  mutation CreateComment($data: CreateCommentInputType) {
    createComment(data: $data) {
      commentId
      schoolYear
      content
      createdBy
      regno
      updatedAt
      type
    }
  }
`;
