import { gql } from "@apollo/client";
import { REPOSITORY_INFO, USER_DETAILS, PAGE_INFO } from "./fragments";

export const GET_REPOSITORIES = gql`
  query Repositories(
    $after: String
    $first: Int
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      after: $after
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      totalCount
      edges {
        node {
          ...RepositoryInfo
        }
        cursor
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
  ${PAGE_INFO}
  ${REPOSITORY_INFO}
`;

export const ME = gql`
  query Me($includeReviews: Boolean = false) {
    me {
      ...UserDetails
      reviews @include(if: $includeReviews) {
        edges {
          node {
            rating
            text
            createdAt
            id
            repository {
              id
              ownerName
              name
            }
          }
        }
      }
    }
  }
  ${USER_DETAILS}
`;

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!, $first: Int, $after: String) {
    repository(id: $repositoryId) {
      ...RepositoryInfo
      reviews(first: $first, after: $after) {
        totalCount
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
          cursor
        }
        pageInfo {
          ...PageInfo
        }
      }
    }
  }
  ${REPOSITORY_INFO}
  ${USER_DETAILS}
  ${PAGE_INFO}
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
