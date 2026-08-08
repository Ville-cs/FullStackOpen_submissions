import { FlatList, ActivityIndicator, View } from "react-native";
import Text from "../Text";
import ReviewItem from "../RepositoryList/SingleRepository/ReviewItem";
import ReviewButtons from "./ReviewButtons";
import useGetUser from "../../hooks/useGetUser";

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const {
    data: userData,
    loading,
    error,
    refetch,
  } = useGetUser({ includeReviews: true });
  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  if (!userData) {
    return <Text>No reviews found.</Text>;
  }

  const reviewNodes = userData
    ? userData.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => (
        <View>
          <ReviewItem review={item} />
          <ReviewButtons review={item} refetch={refetch} />
        </View>
      )}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={({ id }) => id}
    />
  );
};

const styles = {
  separator: {
    height: 15,
  },
};

export default MyReviews;
