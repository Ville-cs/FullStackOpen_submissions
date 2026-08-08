import useRepositories from "../../hooks/useRepositories";
import { FlatList, View, StyleSheet, ActivityIndicator } from "react-native";
import RepositoryItem from "./RepositoryItem";
import Text from "../Text";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

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
  const [options, setOptions] = useState({});
  const [selectedSort, setSelectedSort] = useState("latest");
  const sortOptions = {
    latest: {
      orderBy: "CREATED_AT",
      orderDirection: "DESC",
    },
    highest: {
      orderBy: "RATING_AVERAGE",
      orderDirection: "DESC",
    },
    lowest: {
      orderBy: "RATING_AVERAGE",
      orderDirection: "ASC",
    },
  };
  const handleSortChange = (value) => {
    setSelectedSort(value);
    setOptions(sortOptions[value]);
  };
  const { repositories, loading, error } = useRepositories(options);
  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Error while fetching the data</Text>;
  }
  if (!repositories) {
    return <Text>No repositories found</Text>;
  }
  return (
    <View>
      <View>
        <Picker
          selectedValue={selectedSort}
          onValueChange={handleSortChange}
          prompt="Sort repositories by:"
        >
          <Picker.Item label="Latest repositories" value="latest" />
          <Picker.Item label="Highest rated repositories" value="highest" />
          <Picker.Item label="Lowest rated repositories" value="lowest" />
        </Picker>
      </View>
      <RepositoryListContainer repositories={repositories} />
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 30,
  },
});

export default RepositoryList;
