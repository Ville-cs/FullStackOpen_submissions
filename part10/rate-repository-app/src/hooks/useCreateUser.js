import { CREATE_USER } from "../graphql/mutations";
import { useMutation } from "@apollo/client/react";

const useCreateUser = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  const createUser = async ({ username, password }) => {
    const user = {
      username,
      password,
    };

    const { data } = await mutate({
      variables: {
        user,
      },
    });
    return data.createUser;
  };

  return [createUser, result];
};

export default useCreateUser;
