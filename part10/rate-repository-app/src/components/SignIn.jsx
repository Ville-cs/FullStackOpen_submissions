import { View, TextInput, Pressable, StyleSheet, Button } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';

const SignIn = () => {
  const styles = StyleSheet.create({
    layout: {
      marginTop: 25,
      marginHorizontal: 25,
      gap: 25,
    },
    border: {
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: '#3c2f2f57',
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: values => {
      console.log(values);
    },
  });

  return (
    <View style={styles.layout}>
      <TextInput
        autoCapitalize={'none'}
        style={styles.border}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      <TextInput
        autoCapitalize={'none'}
        style={styles.border}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry
      />
      <Button onPress={formik.handleSubmit} title="Sign in"></Button>
    </View>
  );
};

export default SignIn;
