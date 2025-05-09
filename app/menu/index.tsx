import { Stack, router} from 'expo-router';
import {Text ,Button, View} from 'react-native'

export default function index() {
    return (
        <>
            <Stack.Screen options={{ title: 'Menu' }} />
            <View className='h-full w-full flex bg-white justify-center items-center text-6xl'>
                Main Menu
            </View>
        </>
    );
}