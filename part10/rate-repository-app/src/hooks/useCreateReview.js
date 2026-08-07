import { REVIEW_REPOSITORY } from "../graphql/mutations";
import { useMutation } from "@apollo/client/react";

const useCreateReview = () => {
  const [mutate, result] = useMutation(REVIEW_REPOSITORY);
  const createReview = async ({
    username,
    name,
    numericRating,
    reviewText,
  }) => {
    const review = {
      ownerName: username,
      repositoryName: name,
      rating: numericRating,
      text: reviewText,
    };

    const { data } = await mutate({
      variables: {
        review,
      },
    });
    return data.createReview;
  };

  return [createReview, result];
};

export default useCreateReview;
