import { useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const useSignIn = () => {
  const apolloclient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const credentials = { username: username, password: password };
    const { data } = await mutate({ variables: { credentials } });
    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloclient.resetStore();
    return data;
  };

  return [signIn, result];
};

export default useSignIn;
