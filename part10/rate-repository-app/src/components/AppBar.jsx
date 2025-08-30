import { View, StyleSheet, Pressable, ScrollView, Button } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';
import { Link } from 'react-router-native';
import { ME } from '../graphql/queries';
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import useLogout from '../hooks/useLogout';

const AppBar = () => {
  const logout = useLogout();

  const [user, setUser] = useState();
  const { data } = useQuery(ME);
  useEffect(() => {
    data ? setUser(data.me) : null;
  }, [data]);

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
          {user ? (
            <Text
              fontSize="subheading"
              color="textSecondary"
              fontWeight="bold"
              onPress={() => logout()}
            >
              Sign out
            </Text>
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
    backgroundColor: '#2961d1ff',
  },
  layout: {
    marginTop: 10,
    flexDirection: 'row',
    gap: 10,
  },
});

export default AppBar;
