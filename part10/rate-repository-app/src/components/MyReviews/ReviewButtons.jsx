import { Pressable, View, StyleSheet, Alert } from "react-native";
import Text from "../Text";
import { useNavigate } from "react-router-native";
import { DELETE_REVIEW } from "../../graphql/mutations";
import { useMutation } from "@apollo/client/react";

const ReviewButtons = ({ review, refetch }) => {
  const [mutate] = useMutation(DELETE_REVIEW);
  const navigate = useNavigate();
  const handleDelete = (id) => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            await mutate({
              variables: { deleteReviewId: id },
            });
            refetch({ includeReviews: true });
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigate(`/${review.repository.id}`)}>
        <Text
          color="textSecondary"
          backgroundColor="blue"
          style={styles.button}
        >
          View repository
        </Text>
      </Pressable>
      <Pressable onPress={() => handleDelete(review.id)}>
        <Text color="textSecondary" style={[styles.button, styles.delete]}>
          Delete review
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 15,
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 15,
  },
  button: {
    padding: 20,
    borderRadius: 25,
  },
  delete: {
    backgroundColor: "#f03a3a",
  },
});

export default ReviewButtons;
