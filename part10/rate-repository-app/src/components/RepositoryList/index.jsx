import useRepositories from "../../hooks/useRepositories";
import { FlatList, View, StyleSheet, ActivityIndicator } from "react-native";
import RepositoryItem from "./RepositoryItem";
import Text from "../Text";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

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
  const [searchKeyword, setSearchKeyword] = useState("");
  const [delayedSearchKeyword] = useDebounce(searchKeyword, 750);
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
  const { repositories, loading, error } = useRepositories({
    ...options,
    searchKeyword: delayedSearchKeyword,
  });
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
    <View style={styles.container}>
      <Searchbar
        style={styles.search}
        placeholder="Filter repositories"
        onChangeText={setSearchKeyword}
        value={searchKeyword}
      />
      <View style={styles.sort}>
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
  container: {
    flex: 1,
  },
  sort: {
    marginTop: 0,
    marginBottom: 20,
    backgroundColor: "#f2ebebde",
    borderRadius: 25,
    paddingLeft: 15,
  },
  search: {
    marginBottom: 10,
  },
});

export default RepositoryList;
