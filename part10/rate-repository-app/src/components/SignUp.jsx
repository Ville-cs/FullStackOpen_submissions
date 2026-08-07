import { View, Button, StyleSheet } from "react-native";
import FormikTextInput from "./Formik/FormikTextInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router";
import useCreateUser from "../hooks/useCreateUser";
import { useState } from "react";
import Text from "./Text";
import useSignIn from "../hooks/useSignIn";

const validationSchema = yup.object().shape({
  username: yup.string().min(5).max(30).required("Username is required"),
  password: yup.string().min(5).max(50).required("Password is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required("Confirm password is required"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();
  const [errorText, setErrorText] = useState("");

  const onSubmit = async (values) => {
    try {
      setErrorText("");
      const { username, password } = values;
      await createUser({
        username,
        password,
      });
      await signIn({ username, password });
      navigate("/");
    } catch (e) {
      console.log(e);
      setErrorText(e.message);
    }
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      passwordConfirm: "",
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
      <FormikTextInput
        formik={formik}
        name="passwordConfirm"
        placeholder="Confirm password"
        secureTextEntry
      />
      <Button onPress={formik.handleSubmit} title="Sign Up"></Button>
      {errorText && <Text error>{errorText}</Text>}
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

export default SignUp;
