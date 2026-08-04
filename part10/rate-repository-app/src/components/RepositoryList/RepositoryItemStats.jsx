import { View, StyleSheet } from "react-native";
import Text from "../Text";

const RepositoryItemStats = ({ item }) => {
  return (
    <View style={styles.stats}>
      <View style={styles.statItem}>
        <Text fontSize="subheading" fontWeight="bold">
          {formatThousands(item.stargazersCount)}
        </Text>
        <Text>Stars</Text>
      </View>
      <View style={styles.statItem}>
        <Text fontSize="subheading" fontWeight="bold">
          {formatThousands(item.forksCount)}
        </Text>
        <Text>Forks</Text>
      </View>
      <View style={styles.statItem}>
        <Text fontSize="subheading" fontWeight="bold">
          {formatThousands(item.reviewCount)}
        </Text>
        <Text>Reviews</Text>
      </View>
      <View style={styles.statItem}>
        <Text fontSize="subheading" fontWeight="bold">
          {formatThousands(item.ratingAverage)}
        </Text>
        <Text>Rating</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  stats: {
    flexDirection: "row",
    gap: 40,
    justifyContent: "center",
  },
  statItem: {
    alignItems: "center",
    gap: 5,
  },
});

const formatThousands = (value) => {
  if (value < 1000) return value.toString();

  return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}k`;
};

export default RepositoryItemStats;
