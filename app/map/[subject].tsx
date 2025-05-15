import { Stack, useLocalSearchParams, router, } from 'expo-router';
import { View, Text, FlatList, ImageBackground, TouchableOpacity, SafeAreaView } from 'react-native';
import Background from '~/assets/LevelMaps.png'
import LevelIcon from '~/components/LevelIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { get, ref } from "firebase/database";
import { auth, db } from '~/utils/firebase';
export default function SubjectLevels() {
  const { subject } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  
  // You can later replace this with levels from DB
  const levels = ['1', '2', '3', '4', '5'];
  const [unlockedLevel, setUnlockedLevel] = useState(0);
  
  useEffect(()=>{
    const fetchProgess = async () => {
        const uid = auth.currentUser?.uid;
        const progressRef = ref(db, `users/${uid}/progress/${subject}`);
        const snap = await get(progressRef);
        const value = snap.val() || 0;
        setUnlockedLevel(value); 
    };
    fetchProgess();
  },[subject]);

  type ItemProps = { level: string };
  const Item = ({ level }: ItemProps) => {
    const isUnlocked = parseInt(level) <= unlockedLevel + 1;
    return(
      <TouchableOpacity 
        disabled={!isUnlocked}
        onPress={() => router.push({
          pathname: '/battle/[levelId]',
          params: { levelId: `${subject}-${level}` }
      })} >
        <View className={`${!isUnlocked?'opacity-50':''}`}><LevelIcon
          level={level} locked={!isUnlocked}
        /></View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Maps', headerShown: false }} />

      <View className="flex-1 h-full w-full items-center justify-center">
        <ImageBackground source={Background} className='h-full w-full' resizeMode='contain'>
          <SafeAreaView style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Text className="text-xl mb-4 font-bold text-white" style={{ fontFamily: 'PressStart2P' }}>{`Levels for ${subject}`}</Text>
              <FlatList
                data={levels}
                renderItem={({ item }) => <Item level={item} />}
                keyExtractor={item => item}
                ItemSeparatorComponent={() => <View style={{ height: 45 }} />}
                scrollEnabled={false}
                contentContainerStyle={{
                  paddingTop: 20,
                  paddingBottom: 20,
                  paddingHorizontal: 20
                }}
              />
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View >

    </>
  );
}