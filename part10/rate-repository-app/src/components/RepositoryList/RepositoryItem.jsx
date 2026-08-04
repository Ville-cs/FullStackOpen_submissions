import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RepositoryItemStats from "./RepositoryItemStats";
import RepositoryItemInfo from "./RepositoryItemInfo";

const RepositoryItem = ({ item }) => {
  return (
    <SafeAreaView>
      <View style={styles.margin} testId="repositoryItem">
        <RepositoryItemInfo item={item} />
        <RepositoryItemStats item={item} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  margin: {
    marginTop: 25,
  },
});

export default RepositoryItem;
