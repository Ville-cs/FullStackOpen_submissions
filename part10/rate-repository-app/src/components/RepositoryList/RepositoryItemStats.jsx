import { View, StyleSheet } from 'react-native';
import Text from '../Text';

const RepositoryItemStats = ({ item }) => {
  const styles = StyleSheet.create({
    stats: {
      flexDirection: 'row',
      gap: 40,
      justifyContent: 'center',
    },
    statItem: {
      alignItems: 'center',
      gap: 5,
    },
  });

  return (
    <View style={styles.stats}>
      <View style={styles.statItem}>
        <Text fontSize="subheading" fontWeight="bold">
          {item.stargazersCount}
        </Text>
        <Text>Stars</Text>
      </View>
      <View style={styles.statItem}>
        <Text fontSize="subheading" fontWeight="bold">
          {item.forksCount}
        </Text>
        <Text>Forks</Text>
      </View>
      <View style={styles.statItem}>
        <Text fontSize="subheading" fontWeight="bold">
          {item.reviewCount}
        </Text>
        <Text>Reviews</Text>
      </View>
      <View style={styles.statItem}>
        <Text fontSize="subheading" fontWeight="bold">
          {item.ratingAverage}
        </Text>
        <Text>Rating</Text>
      </View>
    </View>
  );
};

export default RepositoryItemStats;
