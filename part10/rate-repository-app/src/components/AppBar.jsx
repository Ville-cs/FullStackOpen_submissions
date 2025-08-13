import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';

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
      <Pressable style={styles.layout}>
        <Text fontSize="subheading" color="textSecondary" fontWeight="bold">
          Repositories
        </Text>
        <Text fontSize="subheading" color="textSecondary" fontWeight="bold">
          Create a review
        </Text>
        <Text fontSize="subheading" color="textSecondary" fontWeight="bold">
          Sign out
        </Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
