import { View, Button, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import FormikTextInput from "./FormikTextInput";
import useSignIn from "../../hooks/useSignIn";
import { useNavigate } from "react-router";

const validationSchema = yup.object().shape({
  username: yup.string().required("a username is required"),
  password: yup.string().required("a password is required"),
});

export const SignInContainer = ({ onSubmit }) => {
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
        autoCapitalize="none"
        secureTextEntry
      />
      <Button onPress={formik.handleSubmit} title="Sign in"></Button>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const data = await signIn({ username, password });
      console.log(data.authenticate.accessToken);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInContainer onSubmit={onSubmit} />;
};

const styles = StyleSheet.create({
  layout: {
    marginTop: 25,
    marginHorizontal: 25,
    gap: 25,
  },
});

export default SignIn;
