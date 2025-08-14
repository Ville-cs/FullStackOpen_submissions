import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 20,
    paddingLeft: 20,
    backgroundColor: '#2961d1ff',
  },
  layout: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
  },
});

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
          <Link to="/">
            <Text fontSize="subheading" color="textSecondary" fontWeight="bold">
              Create a review
            </Text>
          </Link>
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

export default AppBar;
