import { Stack, router } from 'expo-router';
import { View, Text, TextInput, Button, Alert, ImageBackground, ScrollView, KeyboardAvoidingView } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '~/utils/firebase';
import { useState } from 'react';
import Background from 'assets/background.png'
import Logo from '~/components/Logo';
import { SymbolView } from 'expo-symbols';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignup = async () => {
    if (!email || !password || !name) {
      console.log('Missing Info');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: uid,
          email: email,
          name: name
        })
      });

      const result = await response.json();

      if (response.ok) {
        // Alert.alert('Account Created', 'You can now log in.');
        console.log('Account Created', 'You can now log in.');
        router.replace('/login');
      } else {
        // Alert.alert('Backend Error', result.error || 'Could not create profile.');
        console.log('Backend Error', result.error || 'Could not create profile.')
      }
    } catch (error: any) {
      // Alert.alert('Signup Failed', error.message);
      console.log('Signup Failed', error.message)
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Sign Up', headerShown: false }} />
      <View className='flex-1 bg-white h-screen w-screen items-center justify-center'>
        <ImageBackground source={Background} className='h-screen w-screen items-center justify-center' resizeMode='contain'>
          <KeyboardAvoidingView behavior="padding" className='w-full flex-1'>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
              <View className='relative items-center justify-center z-20 translate-y-[-80px]'>
                <Logo />
              </View>
              <View className='relative bg-greyish-base m-5 p-10 backdrop-opacity-80 rounded-[20px]'>
                <View className={`flex-row mb-5 h-[48px] rounded-[20px] w-full border-solid active:border-blue-300 border-2 bg-white border-blue-100 text-[13px] items-center text-press-start ${(!email ? 'pl-6' : '')}`}>
                  {<SymbolView
                    name="person.fill"
                    colors='#000000'
                    size={25}
                    style={{ opacity: email ? 0 : 1 }}
                    tintColor='black'
                  />}
                  <TextInput
                    className={`flex-1 text-center ${(email ? 'pr-12' : 'pr-6')} h-[48px]`}
                    style={{ fontFamily: 'PressStart2P' }}
                    placeholder='Username'
                    value={email}
                    onChangeText={(e) => setEmail(e)}
                  />

                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </>
  );
}
