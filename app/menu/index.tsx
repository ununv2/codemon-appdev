import { Stack, router} from 'expo-router';
import {Text ,Button, View} from 'react-native'
import { auth } from '~/utils/firebase';

export default function index() {

    const signOut = async() =>{
        await auth.signOut()
        router.replace('../')
    }
    
    return (
        <>
            <Stack.Screen options={{ title: 'Menu' }} />
            <View className='h-full w-full flex bg-white justify-center items-center text-6xl'>
                <Text>Main Menu</Text>
                <Button title="Play" onPress={() => router.push('../map')} />
                <Button title='Signout' onPress={signOut}></Button>
            </View>
        </>
    );
}