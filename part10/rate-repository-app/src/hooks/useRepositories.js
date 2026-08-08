import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ order, direction }) => {
  const { data, loading, refetch, error } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy: order,
      orderDirection: direction,
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
