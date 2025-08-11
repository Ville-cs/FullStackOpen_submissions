import { Text, View } from 'react-native';

const RepositoryItem = ({ item }) => {
  return (
    <View>
      <Text>{item.fullName}</Text>
      <Text>{item.description}</Text>
      <Text>{item.language}</Text>
      <Text>{item.stargazersCount}</Text>
      <Text>{item.forksCount}</Text>
      <Text>{item.reviewCount}</Text>
      <Text>{item.ratingAverage}</Text>
    </View>
  );
};

export default RepositoryItem;
