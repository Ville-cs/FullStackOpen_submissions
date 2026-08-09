import { gql } from "@apollo/client";

export const REPOSITORY_INFO = gql`
  fragment RepositoryInfo on Repository {
    id
    fullName
    description
    forksCount
    language
    ownerAvatarUrl
    ratingAverage
    reviewCount
    stargazersCount
    url
    ownerName
  }
`;

export const USER_DETAILS = gql`
  fragment UserDetails on User {
    id
    username
  }
`;

export const PAGE_INFO = gql`
  fragment PageInfo on PageInfo {
    endCursor
    startCursor
    hasNextPage
  }
`;
