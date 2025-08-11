import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginLeft: 15,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View>
      <AppBar />
      <View style={styles.container}>
        <RepositoryList />
      </View>
    </View>
  );
};

export default Main;
