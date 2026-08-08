import { gql } from "@apollo/client";
import { REPOSITORY_INFO, USER_DETAILS } from "./fragments";

export const AUTHENTICATE = gql`
  mutation ($credentials: AuthenticateInput) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`;

export const CREATE_USER = gql`
  mutation Mutation($user: CreateUserInput) {
    createUser(user: $user) {
      id
      username
      createdAt
    }
  }
`;

export const REVIEW_REPOSITORY = gql`
  mutation ($review: CreateReviewInput) {
    createReview(review: $review) {
      id
      rating
      text
      user {
        ...UserDetails
      }
      repository {
        ...RepositoryInfo
      }
    }
  }
  ${REPOSITORY_INFO}
  ${USER_DETAILS}
`;

export const DELETE_REVIEW = gql`
  mutation Mutation($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;
