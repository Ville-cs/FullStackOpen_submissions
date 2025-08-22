import { View } from 'react-native';
import RepositoryItemStats from './RepositoryItemStats';
import RepositoryItemInfo from './RepositoryItemInfo';

const RepositoryItem = ({ item }) => {
  return (
    <View>
      <RepositoryItemInfo item={item} />
      <RepositoryItemStats item={item} />
    </View>
  );
};

export default RepositoryItem;
