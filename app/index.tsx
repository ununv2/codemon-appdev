import { Stack, Link } from 'expo-router';
import {View, Text} from 'react-native'
import Button  from '~/components/Button';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <View className='justify-center items-center w-screen'>
        <Link href={{pathname:'/login'}} asChild >
          <Button label="login now"></Button>
        </Link>
      </View>
    </>
  );
}
