import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';

const RepositoryItemInfo = ({ item }) => {
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
    textMargin: {
      marginTop: 5,
      marginRight: 80, //stops text overflow to right
    },
  });

  return (
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
  );
};

export default RepositoryItemInfo;
