import { useQuery } from "@apollo/client/react";
import { ME } from "../graphql/queries";

const useGetUser = ({ includeReviews } = {}) => {
  const { data, loading, refetch, error } = useQuery(ME, {
    variables: {
      includeReviews,
    },
    fetchPolicy: "cache-and-network",
  });

  return {
    data: data?.me,
    loading,
    error,
    refetch,
  };
};

export default useGetUser;
