import { Stack } from 'expo-router';
import { View, ActivityIndicator, Text, ImageBackground, ScrollView, Image, Alert, FlatList } from 'react-native';
import Background from 'assets/background.png';
import Stats from '~/components/Stats'
import Statsbox from '~/components/Statbox'
import {useEffect, useState} from 'react';
import { get, ref } from "firebase/database";
import { db, auth } from "~/utils/firebase";
import { SymbolView } from 'expo-symbols'



export default function Stat(){
    type LeaderboardEntry = {
        uid: string;
        name: string;
        wins: number;
    }
    const [userData, setUserData] = useState('');
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            // Fetch user data
            const uid = auth.currentUser?.uid;
            const userSnap = await get(ref(db, `users/${uid}`));
            const user = userSnap.val()
            setUserData(user);
            const res = await fetch(process.env.EXPO_PUBLIC_BACKEND_ENDPOINT+`/leaderboard`);
            const leaderboardData = await res.json();
            setLeaderboard(leaderboardData);
          } catch (error) {
            Alert.alert("Error", (error as any).message);
          }
        };
        fetchData();
      }, []);
    return(
        <>
            <Stack.Screen options={{ title: 'Stat', headerShown: false }} />
            <View className='flex-1 bg-white h-screen w-screen items-center justify-center'>
                <ImageBackground source={Background} className='h-screen w-screen items-center' resizeMode='contain'>

                <View className='items-center justify-center z-20 translate-y-[-0px] mt-28 mb-12'>
                    <Stats/>
                </View>

                <View className='flex flex-row gap-3 justify-around items-center w-[334px] h-[111px] bg-[#FACC14] z-10 rounded-tl-[20px] rounded-tr-[20px] px-4 py-6'>
                    <View className='p-2 z-10 rounded-full bg-[#F7E59A]'>
                        <SymbolView
                            name="person.fill"
                            colors='#000000'
                            size={50}
                            tintColor='white'
                        />
                    </View>
                    <View className='flex flex-col gap-3'>
                        <Text className="text-black text-xl" style={{ fontFamily: 'PressStart2P' }}>{userData.name}</Text>
                        <View className='gap-1'>
                            <Text className="text-black text-sm" style={{ fontFamily: 'PressStart2P' }}>Level: {userData.level}  XP: {userData.xp}</Text>
                            <Text className="text-black text-sm" style={{ fontFamily: 'PressStart2P' }}>Coins: {userData.coins}</Text>
                        </View>
                    </View>
                </View>
                <View className='w-[334px] h-[111px] bg-[#E5BC14] rounded-br-[20px] rounded-bl-[20px] px-6 py-4 mb-12'>
                    <View className='flex flex-col justify-center items-start'>
                        <Text className="text-black text-sm mb-5" style={{ fontFamily: 'PressStart2P' }}>Topic Progress</Text>
                        <View className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-5">
                            <View className="bg-[#006666] h-2.5 rounded-full w-[45%]"></View>
                        </View>
                        <Text className="text-black text-sm" style={{ fontFamily: 'PressStart2P' }}>Won/Lost: {userData?.battle?.won||0}/{userData?.battle?.lost||0}</Text>
                    </View>
                </View>

                <View className="w-full h-[420px] opacity-80 bg-[#032842] rounded-tl-[50px] rounded-tr-[50px]">
                    <View className="flex items-center pt-8">
                        <Text className="text-xl text-white" style={{ fontFamily: 'PressStart2P' }}>
                        LEADERBOARD
                        </Text>
                    </View>
                    <View className='flex flex-row justify-around py-6'>
                        <Text className='text-white text-md' style={{ fontFamily: 'PressStart2P' }}>Rank</Text>
                        <Text className='text-white text-md' style={{ fontFamily: 'PressStart2P' }}>Name</Text>
                        <Text className='text-white text-md' style={{ fontFamily: 'PressStart2P' }}>Wins</Text>
                    </View>
                    <FlatList
                        data={leaderboard}
                        keyExtractor={(item) => item.uid}
                        renderItem={({ item, index }) => (
                            <View className="mb-2 flex flex-row justify-around">
                                <Text className='text-white' style={{ fontFamily: 'PressStart2P' }}>{index + 1}</Text>
                                <Text className='text-white' style={{ fontFamily: 'PressStart2P' }}>{item.name}</Text>
                                <Text className='text-[#FACC14]' style={{ fontFamily: 'PressStart2P' }}>{item.wins}</Text>
                            </View>
                        )}
                        contentContainerStyle={{gap:15}}
                        />
                </View>

                </ImageBackground>
            </View>
        </>
    );
}
