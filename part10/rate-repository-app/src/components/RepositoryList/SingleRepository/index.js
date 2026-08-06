import { ActivityIndicator, FlatList } from "react-native";
import ReviewItem from "./ReviewItem";
import RepositoryView from "./RepositoryView";
import { useParams } from "react-router";
import Text from "../../Text";
import useRepository from "../../../hooks/useRepository";

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading, error } = useRepository(id);

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  if (!repository) {
    return <Text>Repository not found.</Text>;
  }

  const reviewNodes = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryView repository={repository} />}
    />
  );
};

export default SingleRepository;
