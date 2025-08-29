import { useState, useEffect } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepositories = () => {
  const [repositories, setRepositories] = useState();

  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    setRepositories(data?.repositories);
  }, [loading]);

  return { repositories, loading, refetch };
};

export default useRepositories;
