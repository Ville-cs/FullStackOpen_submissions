import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";
import { ME } from "../graphql/queries";
import { useQuery } from "@apollo/client/react";
import useLogout from "../hooks/useLogout";

const AppBar = () => {
  const logout = useLogout();
  const { data } = useQuery(ME);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable style={styles.layout}>
          <Link to="/">
            <Text fontSize="subheading" color="textSecondary" fontWeight="bold">
              Repositories
            </Text>
          </Link>
          {data?.me ? (
            <View style={styles.loggedIn}>
              <Link to="createReview">
                <Text
                  fontSize="subheading"
                  color="textSecondary"
                  fontWeight="bold"
                >
                  Create a review
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
            <Link to="signIn">
              <Text
                fontSize="subheading"
                color="textSecondary"
                fontWeight="bold"
              >
                Sign in
              </Text>
            </Link>
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
    gap: 10,
  },
  loggedIn: {
    flexDirection: "row",
    gap: 10,
  },
});

export default AppBar;
