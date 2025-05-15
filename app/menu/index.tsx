import { Stack, router} from 'expo-router';
import { View, ScrollView, ImageBackground, TouchableOpacity} from 'react-native'
import Background from 'assets/background.png'
import Logo from '~/components/Logo';
import BiggerButton from '~/components/BiggerButton';
import { auth } from '~/utils/firebase';

export default function index() {
    const handdleSignout = () =>{
        auth.signOut()
        router.replace('/')
    }

    
    return (
        <>
            <Stack.Screen options={{ title: 'Login', headerShown: false }} />
            <View className='flex-1 bg-white h-screen w-screen items-center justify-center'>
                <ImageBackground source={Background} className='h-screen w-screen items-center justify-center' resizeMode='contain'>
                    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <View className='relative items-center justify-center z-20 translate-y-[-80px]'>
                            <Logo />
                        </View>
                        <View className='flex flex-col gap-10'>
                            <BiggerButton
                                onPress={() => router.push('../map')}
                                label="Play Now"
                            />
                            <BiggerButton
                                onPress={() => router.push('../stat')}
                                label="Stats"
                            />
                            <BiggerButton
                                onPress={handdleSignout}
                                label="Exit"
                            />
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>
        </>
    );
}