import { View, Button, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import FormikTextInput from "./FormikTextInput";

const validationSchema = yup.object().shape({
  username: yup.string().required("a username is required"),
  password: yup.string().required("a password is required"),
});

const SignIn = () => {
  const onSubmit = async (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.layout}>
      <FormikTextInput
        formik={formik}
        name="username"
        placeholder="Username"
        autoCapitalize="none"
      />

      <FormikTextInput
        formik={formik}
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <Button onPress={formik.handleSubmit} title="Sign in"></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    marginTop: 25,
    marginHorizontal: 25,
    gap: 25,
  },
});

export default SignIn;
