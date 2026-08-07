import { View, Image, StyleSheet } from "react-native";
import Text from "../Text";

const RepositoryItemInfo = ({ item }) => {
  return (
    <View style={styles.flex}>
      <Image
        style={styles.avatar}
        source={{
          uri: item.ownerAvatarUrl,
        }}
      />
      <View style={styles.content}>
        <Text fontSize="subheading" fontWeight="bold">
          {item.fullName}
        </Text>
        <Text style={styles.textMargin}>{item.description}</Text>
        <View style={styles.languageContainer}>
          <Text
            color="textSecondary"
            backgroundColor="blue"
            style={styles.bgPadding}
          >
            {item.language}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
  },
  bgPadding: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  flex: {
    flexDirection: "row",
    gap: 20,
  },
  textMargin: {
    marginTop: 5,
  },
  languageContainer: {
    alignSelf: "flex-start",
    marginTop: 5,
    marginBottom: 20,
  },
});

export default RepositoryItemInfo;
