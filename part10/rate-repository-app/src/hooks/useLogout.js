import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';

const useLogout = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const logout = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };
  return logout;
};

export default useLogout;
