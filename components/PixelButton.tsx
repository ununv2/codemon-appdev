import { Text, View, TouchableOpacity, GestureResponderEvent } from 'react-native';

interface Props {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  className?: string;
}

export default function PixelButton({ children, onPress, className }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className= "group relative min-h-[44px] px-8 py-2 bg-amber-500 active:bg-amber-400"
    >
      {/* Border shadow layer */}
      <View className="absolute inset-0 -z-10 translate-y-1 bg-amber-500 group-hover:bg-amber-400" />
      <View className="absolute inset-0 -z-10 bg-amber-400 group-hover:bg-amber-300 active:translate-y-0.5 active:bg-amber-400" />

      {/* Content */}
      <View className="group-active:translate-y-0.5 transition-transform">
        <Text className="text-xl font-pixel text-amber-950 text-center">{children}</Text>
      </View>
    </TouchableOpacity>
  );
}
