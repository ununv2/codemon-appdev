import { useLocalSearchParams, router } from 'expo-router';
import { View, Text, Button } from 'react-native';

export default function SubjectLevels() {
  const { subject } = useLocalSearchParams();

  // You can later replace this with levels from DB
  const levels = [1, 2, 3, 4, 5];

  return (
    <View className="flex-1 p-4">
      <Text className="text-xl mb-4">{`Levels for ${subject}`}</Text>
      {levels.map((level) => (
        <Button
          key={level}
          title={`Level ${level}`}
          onPress={() => router.push({pathname: '/battle/[levelId]', params: { levelId: `${subject}-${level}` }
})}
        />
      ))}
    </View>
  );
}
