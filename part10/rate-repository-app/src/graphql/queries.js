import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
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
