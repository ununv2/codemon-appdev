import { Stack, router} from 'expo-router';
import { auth } from '~/utils/firebase';
import { Text, TextInput, View, ScrollView, ImageBackground, TouchableOpacity} from 'react-native'
import Background from 'assets/background.png'
import Logo from '~/components/Logo';
import Button from '~/components/Button';

export default function index() {


    
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
                            <Button
                                onPress={() => router.push('../map')}
                                label="Play Now"
                            />
                            <Button
                                onPress={() => router.push('../stat')}
                                label="Stats"
                            />
                            <Button
                                onPress={() => router.push('../exit')}
                                label="Exit"
                            />
                        </View>
                    </ScrollView>
                </ImageBackground>
            </View>
        </>
    );
}