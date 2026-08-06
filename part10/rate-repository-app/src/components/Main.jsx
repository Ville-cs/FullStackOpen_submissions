import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";
import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import SingleRepository from "./RepositoryList/SingleRepository";
import SignIn from "./SignIn";
import { SafeAreaView } from "react-native-safe-area-context";

const Main = () => {
  return (
    <SafeAreaView style={styles.container}>
      <AppBar />
      <View style={styles.margin}>
        <Routes>
          <Route path="/" element={<RepositoryList />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path=":id" element={<SingleRepository />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  margin: {
    marginHorizontal: 15,
    flex: 1,
  },
});

export default Main;
