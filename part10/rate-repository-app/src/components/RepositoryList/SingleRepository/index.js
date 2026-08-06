import {
  View,
  ActivityIndicator,
  Pressable,
  StyleSheet,
  FlatList,
} from "react-native";
import RepositoryItemInfo from "../RepositoryItemInfo";
import RepositoryItemStats from "../RepositoryItemStats";
import ReviewItem from "./ReviewItem";
import { useParams } from "react-router";
import Text from "../../Text";
import * as Linking from "expo-linking";
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

  const handlePress = () => {
    Linking.openURL(repository.url);
  };

  return (
    <View>
      <RepositoryItemInfo item={repository} />
      <RepositoryItemStats item={repository} />
      <Pressable onPress={handlePress}>
        <Text
          fontWeight="bold"
          fontSize="subheading"
          backgroundColor="blue"
          color="textSecondary"
          style={styles.button}
        >
          Open in GitHub
        </Text>
      </Pressable>
      <FlatList
        data={reviewNodes}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={({ id }) => id}
        //   ListHeaderComponent={() => <RepositoryView ... />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    textAlign: "center",
    paddingVertical: 20,
    borderRadius: 10,
  },
});

export default SingleRepository;
