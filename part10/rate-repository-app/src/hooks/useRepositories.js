import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ orderBy, orderDirection } = {}) => {
  const { data, loading, refetch, error } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy,
      orderDirection,
    },
    fetchPolicy: "cache-and-network",
  });

  return {
    repositories: data?.repositories,
    loading,
    error,
    refetch,
  };
};

export default useRepositories;
