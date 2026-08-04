import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import { Link } from "react-router-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable style={styles.layout}>
          <Link to="/">
            <Text fontSize="subheading" color="textSecondary" fontWeight="bold">
              Repositories
            </Text>
          </Link>
          {/* <Link to="/">
            <Text fontSize="subheading" color="textSecondary" fontWeight="bold">
              Create a review
            </Text>
          </Link> */}
          <Link to="signIn">
            <Text fontSize="subheading" color="textSecondary" fontWeight="bold">
              Sign in
            </Text>
          </Link>
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
  },
  layout: {
    marginTop: 10,
    flexDirection: "row",
    gap: 10,
  },
});

export default AppBar;
