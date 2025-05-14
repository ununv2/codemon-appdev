import { Stack, router } from 'expo-router';
import { View, Text, Button } from 'react-native';

const subjects = ['python', 'java', 'react', 'cs'];

export default function MapSelection() {
  return (
    <>
      <Stack.Screen options={{ title: 'Choose Subject' }} />
      <View className="flex-1 p-4">
        {subjects.map((subject) => (
          <Button
            key={subject}
            title={`Learn ${subject}`}
            onPress={() => router.push({ pathname: "/map/[subject]", params: { subject } })}
          />
        ))}
      </View>
    </>
  );
}
