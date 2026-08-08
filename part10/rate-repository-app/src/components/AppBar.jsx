import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";
import useLogout from "../hooks/useLogout";
import useGetUser from "../hooks/useGetUser";

const AppBar = () => {
  const logout = useLogout();
  const { data: userData } = useGetUser();
  // const { data: userData } = useGetUser({ includeReviews: true });

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable style={styles.layout}>
          <Link to="/">
            <Text fontSize="subheading" color="textSecondary" fontWeight="bold">
              Repositories
            </Text>
          </Link>
          {userData ? (
            <View style={styles.subContainer}>
              <Link to="createReview">
                <Text
                  fontSize="subheading"
                  color="textSecondary"
                  fontWeight="bold"
                >
                  Create a review
                </Text>
              </Link>
              <Link to="myReviews">
                <Text
                  fontSize="subheading"
                  color="textSecondary"
                  fontWeight="bold"
                >
                  My reviews
                </Text>
              </Link>
              <Text
                fontSize="subheading"
                color="textSecondary"
                fontWeight="bold"
                onPress={() => logout()}
              >
                Sign out
              </Text>
            </View>
          ) : (
            <View style={styles.subContainer}>
              <Link to="signIn">
                <Text
                  fontSize="subheading"
                  color="textSecondary"
                  fontWeight="bold"
                >
                  Sign in
                </Text>
              </Link>
              <Link to="signUp">
                <Text
                  fontSize="subheading"
                  color="textSecondary"
                  fontWeight="bold"
                >
                  Sign Up
                </Text>
              </Link>
            </View>
          )}
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: theme.appBar.primary,
    marginBottom: 25,
  },
  layout: {
    marginTop: 10,
    flexDirection: "row",
    gap: 15,
  },
  subContainer: {
    flexDirection: "row",
    gap: 15,
  },
});

export default AppBar;
