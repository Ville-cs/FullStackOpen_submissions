import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import Text from "./Text";
import theme from "../theme";

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Text color="textSecondary">Repositories</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 20,
    paddingLeft: 20,
    backgroundColor: theme.appBar.primary,
  },
});

export default AppBar;
