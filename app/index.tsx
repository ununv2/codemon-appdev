import { Stack, Link, router } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native'
import Button from '~/components/Button';
import { auth } from '~/utils/firebase';


export default function Home() {
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('Success', `Welcome back, ${user.email}`);
        router.replace('../menu');
      }
    })
  })
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <View className='justify-center items-center w-screen'>
        <Link href={{ pathname: '/login' }} asChild >
          <Button label="login now"></Button>
        </Link>
      </View>
    </>
  );
}
