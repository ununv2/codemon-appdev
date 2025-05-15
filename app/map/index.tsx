import { Stack, router } from 'expo-router';
import { View, ImageBackground, TouchableOpacity, FlatList, Alert,Text, ActivityIndicator } from 'react-native';
import { SvgProps } from 'react-native-svg';
import React from 'react';
import Background from 'assets/background.png'
import HtmlLogo from '~/components/HtmlLogo';
import ReactLogo from '~/components/ReactLogo';
import CssLogo from '~/components/CssLogo';
import JsLogo from '~/components/JsLogo';
import PythonLogo from '~/components/PythonLogo'
import SubjectCard from '~/components/SubjectCard';
import ChooseMaps from '~/components/ChooseMaps'
import { useState, useEffect } from 'react';
import { db, auth } from '~/utils/firebase';
import { get, ref } from "firebase/database";

// Change the icon property to store the component type, not JSX elements
const subjects = [
  { name: 'html', icon: HtmlLogo, progress: 0 },
  { name: 'react', icon: ReactLogo, progress: 0 },
  { name: 'python', icon: PythonLogo, progress: 0 },
  { name: 'javascript', icon: JsLogo, progress: 0 },
  { name: 'css', icon: CssLogo, progress: 0 },
  { name: '???', icon: null, progress: 0 }, // Use null for missing icon
]
export default function MapSelection() {
  type RenderProps = {
    name: string;
    icon: React.ComponentType<SvgProps> | null;
    progress: number;
  };

  const [ subjectData, setSubjectData ] = useState<typeof subjects>([]);
  useEffect(() => {
    const fetchData = async () => {
      try{
        const uid = auth.currentUser?.uid;
        const userSnap = await get(ref(db, `users/${uid}`));
        const user = userSnap.val()
        const progressData = user.progress
        const updated = [
        { name: 'html', icon: HtmlLogo, progress: Math.floor((progressData.html/5)*100) || 0 },
        { name: 'react', icon: ReactLogo, progress: Math.floor((progressData.react/5)*100) || 0 },
        { name: 'python', icon: PythonLogo, progress: Math.floor((progressData.python/5)*100) || 0 },
        { name: 'javascript', icon: JsLogo, progress: Math.floor((progressData.javascript/5)*100) || 0 },
        { name: 'css', icon: CssLogo, progress: Math.floor((progressData.css/5)*100) || 0 },
        { name: '???', icon: null, progress: 0 },
      ];
        setSubjectData(updated);
      }catch (error) {
        Alert.alert("Error", (error as any).message);
      }
    }
    fetchData()
  },[]);

  const Render = ({ name, icon, progress }: RenderProps) => (
    <TouchableOpacity disabled={name==='???'?true:false} onPress={() => router.push({
      pathname: '/map/[subject]',
      params: { subject: name }
    })} >
      <View className={`${name==='???'?'opacity-50':''}`}>
        <SubjectCard
        name={name}
        Icon={icon || (() => null)}
        progress={progress}
      ></SubjectCard>
      </View>
    </TouchableOpacity>
  );


  return (
    <>
      <Stack.Screen options={{ title: 'Choose Subject', headerShown: false }} />
      <View className='flex-1 bg-white h-screen w-screen items-center justify-center'>
        <ImageBackground source={Background} className='h-screen w-screen items-center justify-center' resizeMode='contain'>
          <View className='relative items-center justify-center z-20 translate-y-[-60px]'>
            <ChooseMaps />
          </View>
          <View className="flex-row flex-wrap justify-center gap-4">
            {subjectData.length===0?(<ActivityIndicator></ActivityIndicator>):(<FlatList
              data={subjectData}
              renderItem={({ item }) => <Render name={item.name} icon={item.icon} progress={item.progress} />}
              keyExtractor={item => item.name}
              numColumns={2}
              columnWrapperStyle={{ gap: 20, justifyContent: 'center' }}
              contentContainerStyle={{ gap: 20 }}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            />)}
          </View>
        </ImageBackground>
      </View>
    </>
  );
}

