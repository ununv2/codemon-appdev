import { useEffect, useState } from "react";
import { useLocalSearchParams, router, Stack } from "expo-router";
import { View, Text, Button, ActivityIndicator, Alert, Image, ImageBackground, TouchableOpacity, FlatList } from "react-native";
import { get, ref } from "firebase/database";
import { db, auth } from "~/utils/firebase";
import mattIdle from 'assets/characters/mattidle.gif';
import mattHit from 'assets/characters/matthit.gif';
import mattHurt from 'assets/characters/matthurt.gif';
import ununIdle from 'assets/characters/ununidle.gif';
import ununHit from 'assets/characters/ununhit.gif';
import ununHurt from 'assets/characters/ununhurt.gif';
import BattleField from 'assets/battlefield.png';
import QuestionBox from "~/components/QuestionBox";
import AnswerBox from "~/components/AnswerBox";
import ProgressBar from "~/components/ProgressBar";
import { SafeAreaView } from "react-native-safe-area-context";
import OpponentProgressBar from "~/components/OpponentProgressBar";


export default function BattlePage() {

  const { levelId } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [battleData, setBattleData] = useState<any>(null);

  const [monsterHP, setMonsterHP] = useState(0);
  const [monsterIMG, setMonsterIMG] = useState<any>('');
  const [userHP, setUserHP] = useState(100);
  const [userLevel, setUserLevel] = useState(1);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [skin, setSkin] = useState<"unun" | "matt">("unun");
  const [animationState, setAnimationState] = useState<"idle" | "hit" | "hurt">("idle");
  const [subject, levelStr] = (levelId as string).split("-");
  const levelNum = parseInt(levelStr);
  const currentQuestion = battleData?.questions?.[questionIndex];
  const [popupText, setPopupText] = useState<string | null>(null);

  const skinImages = {
    unun: {
      idle: ununIdle,
      hit: ununHit,
      hurt: ununHurt
    },
    matt: {
      idle: mattIdle,
      hit: mattHit,
      hurt: mattHurt
    }
  };

  const imageMap: Record<string, any> = {
    "ununsaurus.png": require('assets/monsters/ununsaurus.png'),
    "dearzilla.png": require('assets/monsters/dearzilla.png'),
    "mattgpt.png": require('assets/monsters/mattgpt.png'),
    "monster.png": require('assets/monsters/monster.png')
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const uid = auth.currentUser?.uid;
        const userSnap = await get(ref(db, `users/${uid}`));
        const user = userSnap.val()
        const userProgress = user.progress?.[subject] || 0;
        // if (userProgress >= levelNum) {
        //   Alert.alert("Level already completed", "You cannot replay this level.");
        //   return router.replace("/map");
        // }
        setUserLevel(user.level || 1);
        setUserHP(user.hp || 100);

        const EquippedSkin = user.skin || "unun";
        setSkin(EquippedSkin);
        // Fetch battle data
        const battleSnap = await get(ref(db, `battle_data/${levelId}`));
        const battle = battleSnap.val();
        if (!battle) throw new Error("Battle not found");
        const imageKey = battle.monster.image || "monster.png";
        setMonsterIMG(imageMap[imageKey] || imageMap["monster.png"]);
        setBattleData(battle);
        setMonsterHP(battle.monster.hp);
        setLoading(false);
      } catch (error) {
        Alert.alert("Error", (error as any).message);
      }
    };

    fetchData();
  }, []);

  const handleVictory = async () => {
    const uid = auth.currentUser?.uid;
    const reward = battleData.reward || { xp: 100, coins: 20 };

    try {
      await fetch(process.env.EXPO_PUBLIC_BACKEND_ENDPOINT + `/users/${uid}/xp`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: reward.xp })
      });

      await fetch(process.env.EXPO_PUBLIC_BACKEND_ENDPOINT + `/users/${uid}/coins`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: reward.coins })
      });

      await fetch(process.env.EXPO_PUBLIC_BACKEND_ENDPOINT + `/users/${uid}/progress`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: subject })
      });

      await fetch(process.env.EXPO_PUBLIC_BACKEND_ENDPOINT + `/users/${uid}/battle`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ won: true })
      });

      Alert.alert("Victory!", "You defeated the monster! XP and Coins Rewarded!");
      router.replace("/map");
    } catch (error) {
      Alert.alert("Error", (error as any).message);
    }
  };

  const handleDefeat = async () => {
    const uid = auth.currentUser?.uid;
    try {
      await fetch(process.env.EXPO_PUBLIC_BACKEND_ENDPOINT + `/users/${uid}/battle`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ won: false })
      });
      Alert.alert("Defeat...", "You were defeated. Try again.");
      router.replace("/map");
    } catch (error) {
      Alert.alert("Error", (error as any).message);
    }
  };

  const handleAnswer = (selected: string) => {
    if (!battleData || !currentQuestion) return;

    const isCorrect = selected === currentQuestion.answer;
    const userDamage = userLevel * 20;
    const monsterDamage = battleData.monster.damage;

    if (isCorrect) {
      setAnimationState('hit');
      setPopupText("Correct!");
      const newMonsterHP = Math.max(0, monsterHP - userDamage);
      setMonsterHP(newMonsterHP);
      if (newMonsterHP === 0) return handleVictory();
    } else {
      setAnimationState("hurt");
      setPopupText("WRONG! - HP");
      const newUserHP = Math.max(0, userHP - monsterDamage);
      setUserHP(newUserHP);
      if (newUserHP === 0) return handleDefeat();
    }
    setTimeout(() => setAnimationState("idle"), 700);
    setTimeout(() => setPopupText(null), 1000);
    const next = questionIndex + 1;
    if (next < battleData.questions.length) {
      setQuestionIndex(next);
    } else {
      // End of questions but monster still alive
      if (monsterHP > 0) handleDefeat();
    }
  };

  if (loading) return <ActivityIndicator />;

  interface RenderProps {
    answer: string;
    onPress: () => void;
  }

  const Render = ({ answer, onPress }: RenderProps) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <AnswerBox
          answer={answer}
          onPress={onPress}
        ></AnswerBox>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Battle', headerShown: false }}></Stack.Screen>
      <ImageBackground source={BattleField} className="h-screen w-screen">
        <View className="flex-1">
          <SafeAreaView className="top-40">
            <View className="flex flex-row mb-20">
              <View className="flex translate-y-[70px] ">
                <Image source={skinImages[skin][animationState]} style={{ height: 128, width: 128 }} resizeMode="contain" />
                <View className="mt-5">
                  <ProgressBar progress={userHP}></ProgressBar>
                </View>
                {popupText && (
                  <View className="absolute top-1/4 w-full items-center z-50">
                    <Text className="text-2xl font-bold text-yellow-400 bg-white/80 px-4 py-2 rounded">
                      {popupText}
                    </Text>
                  </View>
                )}
              </View>
              <View className="flex-grow items-end -translate-y-6">
                <View className="-translate-y-6">
                  <Text className="text-2xl font-bold text-end -translate-y-6">{battleData.monster.name}</Text>
                  <OpponentProgressBar progress={monsterHP}></OpponentProgressBar>
                </View>
                <Image source={monsterIMG} style={{ height: 128, width: 128 }} resizeMode="contain" className="items-end" />
              </View>
            </View>
              <View className="mt-6 justify-center items-center">
                <View className="mb-10">
                  <QuestionBox
                    question={currentQuestion.prompt}
                  />
                </View>
                <FlatList
                  data={currentQuestion.options}
                  renderItem={({ item }) => <Render answer={item} onPress={() => handleAnswer(item)} />}
                  keyExtractor={item => item}
                  numColumns={2}
                  columnWrapperStyle={{ gap: 40, justifyContent: 'center' }}
                  contentContainerStyle={{ gap: 10 }}
                  scrollEnabled={false}
                />
              </View>
          </SafeAreaView>

        </View>
      </ImageBackground>
    </>
  );
}
