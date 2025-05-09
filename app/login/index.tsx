import { Stack , router} from 'expo-router';
// import {Container} from '~/components/Container'
import {Text, TextInput,Button, View} from 'react-native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import {useState} from 'react'
import { auth } from '~/utils/firebase'

export default function Login() {
    const [ username, setUsername ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')


  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      console.log('Success', `Welcome back, ${userCredential.user.email}`);
      router.replace('../home');
    } catch (error: any) {
      console.log('Login Failed', error.message);
    }
}
    return (
        <>
            <Stack.Screen options={{ title: 'Login' }} />
            <View className='h-full w-full flex bg-white justify-center'>
                <View className='m-5 p-10'>
                    <Text className='flex justify-center text-center p-5 text-xl'>Username</Text>
                    <TextInput className='p-1 rounded border-solid active:border-blue-300 border-2 border-blue-100 text-xl text-justify' placeholder='HomerSimpson' value={username} onChangeText={(e)=>setUsername(e)}/>
                    <Text className='flex justify-center text-center p-5 text-xl' >Password</Text>
                    <TextInput className='p-1 rounded border-solid active:border-blue-300 border-2 border-blue-100 text-xl text-justify' placeholder='********' onChangeText={(e)=>setPassword(e)}/>
                    <Button title='Sign In' onPress={handleLogin}></Button>

                    <Text className="text-center mt-4">Dont have an account?</Text>
                    <Button title="Go to Signup" onPress={() => router.push('/signup')} />
                </View>
            </View>
        </>
    )
}

