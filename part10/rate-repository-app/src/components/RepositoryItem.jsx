import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';

const RepositoryItem = ({ item }) => {
  const styles = StyleSheet.create({
    avatar: {
      width: 50,
      height: 50,
    },
    bgPadding: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      alignSelf: 'flex-start',
      borderRadius: 10,
    },
    flex: {
      flexDirection: 'row',
      gap: 20,
      marginLeft: 15,
    },
    stats: {
      flexDirection: 'row',
      gap: 40,
      justifyContent: 'center',
      // marginBottom: 500,
    },
    statItem: {
      alignItems: 'center',
      gap: 5,
    },
    textMargin: {
      marginTop: 5,
      marginRight: 80, //stops text overflow to right
    },
  });

  return (
    <View>
      <View style={styles.flex}>
        <Image
          style={styles.avatar}
          source={{
            uri: item.ownerAvatarUrl,
          }}
        />
        <View>
          <Text fontSize="subheading" fontWeight="bold">
            {item.fullName}
          </Text>
          <Text style={styles.textMargin}>{item.description}</Text>
          <Text
            style={[styles.bgPadding, styles.textMargin, { marginBottom: 20 }]}
            color="textSecondary"
            backgroundColor="blue"
          >
            {item.language}
          </Text>
        </View>
      </View>
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
    </View>
  );
};

export default RepositoryItem;
