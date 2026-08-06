import { View, ActivityIndicator } from "react-native";
import RepositoryItemInfo from "./RepositoryItemInfo";
import RepositoryItemStats from "./RepositoryItemStats";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORY } from "../../graphql/queries";
import Text from "../Text";

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: id },
    fetchPolicy: "cache-and-network",
  });

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Error: {error.message}</Text>;
  }
  if (!data?.repository) {
    return <Text>Repository not found.</Text>;
  }
  const repo = data.repository;

  return (
    <View>
      <RepositoryItemInfo item={repo} />
      <RepositoryItemStats item={repo} />
    </View>
  );
};

export default SingleRepository;
