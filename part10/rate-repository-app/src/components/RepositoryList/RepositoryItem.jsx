import { View, StyleSheet } from "react-native";
import RepositoryItemStats from "./RepositoryItemStats";
import RepositoryItemInfo from "./RepositoryItemInfo";

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.margin} testID="repositoryItem">
      <RepositoryItemInfo item={item} />
      <RepositoryItemStats item={item} />
    </View>
  );
};

const styles = StyleSheet.create({
  margin: {
    marginTop: 25,
  },
});

export default RepositoryItem;
