import { gql } from "@apollo/client";
import { REPOSITORY_INFO, USER_DETAILS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query GetRepositories {
    repositories {
      edges {
        node {
          ...RepositoryInfo
        }
      }
    }
  }
  ${REPOSITORY_INFO}
`;

export const ME = gql`
  query Me {
    me {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryInfo
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              ...UserDetails
            }
          }
        }
      }
    }
  }
  ${REPOSITORY_INFO}
  ${USER_DETAILS}
`;

export const GET_REVIEWS = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              ...UserDetails
            }
          }
        }
      }
    }
  }
  ${USER_DETAILS}
`;
