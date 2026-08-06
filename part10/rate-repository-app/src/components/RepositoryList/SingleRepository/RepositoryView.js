import { View, Pressable, StyleSheet } from "react-native";
import RepositoryItemInfo from "../RepositoryItemInfo";
import RepositoryItemStats from "../RepositoryItemStats";
import Text from "../../Text";
import * as Linking from "expo-linking";

const RepositoryView = ({ repository }) => {
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

export default RepositoryView;
