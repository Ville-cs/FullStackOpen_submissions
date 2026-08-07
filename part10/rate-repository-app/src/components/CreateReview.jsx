import { View, Button, StyleSheet } from "react-native";
import FormikTextInput from "./Formik/FormikTextInput";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router";
import useCreateReview from "../hooks/useCreateReview";
import Text from "./Text";
import { useState } from "react";

const validationSchema = yup.object().shape({
  username: yup.string().required("Repository owner's username is required"),
  name: yup.string().required("Repository's name is required"),
  rating: yup.number().min(0).max(100).required("Rating is required"),
  review: yup.string(),
});

const CreateReview = () => {
  const navigate = useNavigate();
  const [createReview] = useCreateReview();
  const [errorText, setErrorText] = useState("");

  const onSubmit = async (values) => {
    try {
      const { username, name, rating, review } = values;
      const numericRating = Number(rating);
      const data = await createReview({
        username,
        name,
        numericRating,
        reviewText: review,
      });
      navigate(`/${data?.repository?.id}`);
    } catch (e) {
      console.log(e);
      setErrorText(e.message);
    }
  };
  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
      rating: "",
      review: "",
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
        name="name"
        placeholder="Name"
        autoCapitalize="none"
      />

      <FormikTextInput
        formik={formik}
        name="rating"
        placeholder="Rating"
        keyboardType="number-pad"
      />

      <FormikTextInput
        formik={formik}
        name="review"
        placeholder="Review"
        autoCapitalize="true"
      />
      <Button onPress={formik.handleSubmit} title="Submit review"></Button>
      {errorText && <Text style={styles.error}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    marginTop: 25,
    marginHorizontal: 25,
    gap: 25,
  },
  error: {
    color: "red",
  },
});

export default CreateReview;
