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
        <Text
          style={[styles.bgPadding, styles.textMargin, styles.languageMargin]}
          color="textSecondary"
          backgroundColor="blue"
        >
          {item.language}
        </Text>
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
    alignSelf: "flex-start",
    borderRadius: 10,
  },
  flex: {
    flexDirection: "row",
    gap: 20,
    marginLeft: 15,
  },
  content: {
    flex: 1,
    flexShrink: 1,
  },
  textMargin: {
    marginTop: 5,
    marginRight: 20,
  },
  languageMargin: {
    marginBottom: 20,
  },
});

export default RepositoryItemInfo;
