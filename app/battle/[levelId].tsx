import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function BattleScreen() {
  const { levelId } = useLocalSearchParams();

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl">Battle Stage: {levelId}</Text>
    </View>
  );
}
