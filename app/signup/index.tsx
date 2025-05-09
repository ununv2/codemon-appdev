import { Stack, router } from 'expo-router';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '~/utils/firebase';
import { useState } from 'react';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignup = async () => {
    if (!email || !password || !name) {
      // Alert.alert('Missing Info', 'All fields are required.');
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
      <Stack.Screen options={{ title: 'Sign Up' }} />
      <View className="flex-1 justify-center bg-white px-6">
        <View className="gap-4">
          <Text className="text-2xl font-bold text-center">Create Account</Text>

          <View>
            <Text className="mb-1 text-base">Name</Text>
            <TextInput
              placeholder="Unun"
              value={name}
              onChangeText={setName}
              className="border border-blue-200 rounded px-3 py-2 text-base"
            />
          </View>

          <View>
            <Text className="mb-1 text-base">Email</Text>
            <TextInput
              placeholder="email@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              className="border border-blue-200 rounded px-3 py-2 text-base"
            />
          </View>

          <View>
            <Text className="mb-1 text-base">Password</Text>
            <TextInput
              placeholder="********"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="border border-blue-200 rounded px-3 py-2 text-base"
            />
          </View>

          <Button title="Sign Up" onPress={handleSignup} />
          <Text className="text-center mt-4">Already have an account?</Text>
          <Button title="Go to Login" onPress={() => router.back()} />
        </View>
      </View>
    </>
  );
}
