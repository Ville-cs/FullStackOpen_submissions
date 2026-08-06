import { View, Pressable } from "react-native";
import RepositoryItemStats from "./RepositoryItemStats";
import RepositoryItemInfo from "./RepositoryItemInfo";
import { useNavigate } from "react-router-native";

const RepositoryItem = ({ item }) => {
  const navigate = useNavigate();
  return (
    <View testID="repositoryItem">
      <Pressable onPress={() => navigate(item.id)}>
        <RepositoryItemInfo item={item} />
        <RepositoryItemStats item={item} />
      </Pressable>
    </View>
  );
};

export default RepositoryItem;
