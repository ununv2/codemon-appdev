import { Stack, Link } from 'expo-router';
import {Text, TextInput,Button,View, ScrollView } from 'react-native'
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import {useState} from 'react'

export default function Login() {
    const [ username, setUsername ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    return (
        <>
            <Stack.Screen options={{ title: 'Login' }} />
            <ScrollView className='h-full w-full flex bg-white'>
                <View className='m-5 p-10'>
                    <Text className='flex justify-center text-center p-5 text-xl'>Username</Text>
                    <TextInput className='p-1 rounded border-solid focus:border-blue-300 border-2 border-blue-100 text-xl text-justify' placeholder='HomerSimpson' value={username} onChangeText={(e)=>setUsername(e)}/>
                    <Text className='flex justify-center text-center p-5 text-xl' >Password</Text>
                    <TextInput className='p-1 rounded border-solid focus:border-blue-300 border-2 border-blue-100 text-xl text-justify' placeholder='********' value={password} onChangeText={(e)=>setPassword(e)}/>
                    <Button title='Sign In'></Button>
                </View>
            </ScrollView>
        </>
    )
}
