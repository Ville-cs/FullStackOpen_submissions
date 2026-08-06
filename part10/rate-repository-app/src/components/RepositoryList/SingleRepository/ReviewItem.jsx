import { View, StyleSheet } from "react-native";
import Text from "../../Text";

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text fontSize="subheading" color="primary">
          {review.rating}
        </Text>
      </View>
      <View>
        <Text fontSize="subheading" fontWeight="bold">
          {review.user.username}
        </Text>
        <Text style={styles.margin}>{review.createdAt}</Text>
        <Text style={styles.margin}>{review.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
    flexDirection: "row",
    gap: 20,
  },
  rating: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#0366d6",
    justifyContent: "center",
    alignItems: "center",
  },
  margin: {
    marginTop: 5,
  },
});

export default ReviewItem;
