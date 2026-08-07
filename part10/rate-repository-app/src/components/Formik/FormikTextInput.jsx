import { Text, TextInput, StyleSheet } from "react-native";

const FormikTextInput = ({ formik, name, ...props }) => {
  const hasError = formik.touched[name] && formik.errors[name];

  return (
    <>
      <TextInput
        {...props}
        value={formik.values[name]}
        onChangeText={formik.handleChange(name)}
        onBlur={formik.handleBlur(name)}
        style={[styles.border, hasError && styles.errorBorder]}
      />
      {hasError && <Text style={styles.errorText}>{formik.errors[name]}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  border: {
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#3c2f2f57",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  errorBorder: {
    borderColor: "#d73a4a",
    borderWidth: 3,
  },
  errorText: {
    color: "#d73a4a",
  },
});

export default FormikTextInput;
