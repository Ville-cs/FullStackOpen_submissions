import { View, ActivityIndicator, Pressable, StyleSheet } from "react-native";
import RepositoryItemInfo from "./RepositoryItemInfo";
import RepositoryItemStats from "./RepositoryItemStats";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORY } from "../../graphql/queries";
import Text from "../Text";
import * as Linking from "expo-linking";

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  if (!data?.repository) {
    return <Text>Repository not found.</Text>;
  }
  const repo = data.repository;

  const handlePress = () => {
    Linking.openURL(repo.url);
  };

  return (
    <View>
      <RepositoryItemInfo item={repo} />
      <RepositoryItemStats item={repo} />
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
