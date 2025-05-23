import { Stack, router } from 'expo-router';
import { Text, TextInput, View, KeyboardAvoidingView, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { auth } from '~/utils/firebase'
import Background from 'assets/background.png'
import { SymbolView } from 'expo-symbols'
import Logo from '~/components/Logo';
import Button from '~/components/Button';

export default function Login() {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log('Success', `Welcome back, ${user.email}`);
                router.replace('../menu');
            }
        })
    })

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, username, password);
            console.log('Success', `Welcome back, ${userCredential.user.email}`);
            router.replace('../menu');
        } catch (error: any) {
            console.log('Login Failed', error.message);
        }
    }

    return (
        <>
            <Stack.Screen options={{ title: 'Login', headerShown: false }} />
            <View className='flex-1 bg-white h-screen w-screen items-center justify-center'>
                <ImageBackground source={Background} className='h-screen w-screen items-center justify-center' resizeMode='contain'>

                    <KeyboardAvoidingView
                        behavior="padding"
                        className='w-full flex-1'
                    >
                        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View className='relative items-center justify-center z-20 translate-y-[-80px]'>
                                <Logo />
                            </View>
                            <View className='absolute h-[80px] w-[80px] items-center justify-center z-10 translate-y-[-210%] rounded-full bg-yellow-400'>
                                <SymbolView
                                    name="person.fill"
                                    colors='#000000'
                                    size={50}
                                    tintColor='white'
                                />
                            </View>
                            <View className='relative bg-greyish-base m-5 p-10 backdrop-opacity-80 rounded-[20px] '>
                                <Text className='text-center text-[20px] text-press-start m-5' style={{ fontFamily: 'PressStart2P' }}>Sign In</Text>
                                <View className={`flex-row mb-5 h-[48px] rounded-[20px] w-full border-solid active:border-blue-300 border-2 bg-white border-blue-100 text-[13px] items-center text-press-start ${(!username ? 'pl-6' : '')}`}>
                                    {<SymbolView
                                        name="envelope.fill"
                                        colors='#000000'
                                        size={25}
                                        style={{ opacity: username ? 0 : 1 }}
                                        tintColor='black'
                                    />}
                                    <TextInput
                                        className={`flex-1 text-center h-[48px] ${(username ? 'pr-12' : 'pr-6')}`}
                                        style={{ fontFamily: 'PressStart2P' }}
                                        placeholder='Email'
                                        value={username}
                                        onChangeText={(e) => setUsername(e)}
                                    />

                                </View>
                                <View className={`flex-row mb-5 h-[48px] rounded-[20px] w-full border-solid active:border-blue-300 border-2 bg-white border-blue-100 text-[13px] items-center text-press-start ${(!password ? 'pl-6' : '')}`}>
                                    <SymbolView name='lock.fill' size={25} style={{ opacity: password ? 0 : 1 }} tintColor='black' />
                                    <TextInput className={`flex-1 ${(password ? 'pr-12' : 'pr-6')} text-center h-[48px]`} style={{ fontFamily: 'PressStart2P' }} placeholder='Password' onChangeText={(e) => setPassword(e)} secureTextEntry={true} />

                                </View>
                                <View>
                                    <TouchableOpacity className='w-auto h-[48px] justify-center text-press-start mb-5 items-center' onPress={handleLogin}>
                                        {/* <Text style={{ fontFamily: 'PressStart2P' }} className='text-center text-[13px]' >Login</Text> */}
                                        <Button label="Login"></Button>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity className='w-auto rounded-[20px] border-solid justify-center text-press-start'>
                                    <TouchableOpacity onPress={() => { router.push('../signup') }} className='w-auto rounded-[20px] border-solid justify-center text-press-start'>
                                        <Text style={{ fontFamily: 'PressStart2P' }} className='text-center text-[13px]'>Create Account</Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </View>
        </>
    )
}

