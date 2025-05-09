import { Stack, router } from 'expo-router';
import { ActivityIndicator, Text, View,Button } from 'react-native'
import LoginForm from '~/components/LoginForm';
import { useAuth } from '~/context/auth';

export default function Index() {
  const { user, isLoading, signOut } = useAuth();

  if(isLoading){
    return(
      <>
      <View className='flex-1 justify-center items-center'>
        <ActivityIndicator />
      </View>
      </>
    )
  }

  if(!user){
    return (
      <>
        <LoginForm/>
      </>
    )
  }
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <View className='h-screen w-screen justify-center items-center bg-white'>
        <Text>{JSON.stringify(user)}</Text>
        <Button title='Sign Out' onPress={() => signOut()} />
      </View>
    </>
  );
}
