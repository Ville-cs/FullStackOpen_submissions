import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          stargazersCount
          reviewCount
          ratingAverage
          forksCount
          description
          fullName
          language
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      url
      fullName
      stargazersCount
      reviewCount
      ratingAverage
      forksCount
      description
      fullName
      language
      ownerAvatarUrl
    }
  }
`;
