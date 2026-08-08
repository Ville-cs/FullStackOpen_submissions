import { View, StyleSheet } from "react-native";
import Text from "../../Text";
import { format } from "date-fns";

const ReviewItem = ({ review }) => {
  const title = review.repository
    ? `${review.repository.ownerName}/${review.repository.name}`
    : review.user.username;
  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text fontSize="subheading" color="primary">
          {review.rating}
        </Text>
      </View>
      <View style={styles.content}>
        <Text fontSize="subheading" fontWeight="bold">
          {title}
        </Text>
        <Text style={styles.margin}>{format(review.createdAt, "PP")}</Text>
        <Text style={styles.margin}>{review.text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flexDirection: "row",
    gap: 20,
  },
  content: {
    flex: 1,
  },
  rating: {
    width: 75,
    height: 75,
    borderRadius: 40,
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
