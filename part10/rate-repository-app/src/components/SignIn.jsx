import { View, TextInput, StyleSheet, Button } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useState, useEffect } from 'react';

const validationSchema = yup.object().shape({
  username: yup.string().required('a username is required'),
  password: yup.string().required('a password is required'),
});

const SignIn = () => {
  const [userError, setUserError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
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
    validationSchema,
    onSubmit: values => {
      console.log(values);
    },
  });

  useEffect(() => {
    formik.touched.username && formik.errors.username
      ? setUserError(true)
      : setUserError(false);
    formik.touched.password && formik.errors.password
      ? setPasswordError(true)
      : setPasswordError(false);
  }, [formik.errors]);

  return (
    <View style={styles.layout}>
      <TextInput
        style={[
          styles.border,
          { borderColor: userError ? '#d73a4a' : '#3c2f2f57' },
        ]}
        autoCapitalize={'none'}
        autoFocus={true}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={[
          styles.border,
          { borderColor: passwordError ? '#d73a4a' : '#3c2f2f57' },
        ]}
        autoCapitalize={'none'}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
      )}
      <Button onPress={formik.handleSubmit} title="Sign in"></Button>
    </View>
  );
};

export default SignIn;
