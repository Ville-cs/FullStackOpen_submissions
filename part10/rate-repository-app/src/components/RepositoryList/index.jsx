import useRepositories from "../../hooks/useRepositories";
import { FlatList, View, StyleSheet, ActivityIndicator } from "react-native";
import RepositoryItem from "./RepositoryItem";
import Text from "../Text";

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  );
};

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositories();
  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Error while fetching the data</Text>;
  }
  if (!repositories) {
    return <Text>No repositories found</Text>;
  }
  return <RepositoryListContainer repositories={repositories} />;
};

const styles = StyleSheet.create({
  separator: {
    height: 30,
  },
});

export default RepositoryList;
