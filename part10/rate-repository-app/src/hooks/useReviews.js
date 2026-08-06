import { useQuery } from "@apollo/client/react";
import { GET_REVIEWS } from "../graphql/queries";

const useReviews = () => {
  const { data, loading, refetch, error } = useQuery(GET_REVIEWS, {
    fetchPolicy: "cache-and-network",
  });

  return {
    reviews: data?.repository?.reviews,
    loading,
    error,
    refetch,
  };
};

export default useReviews;
