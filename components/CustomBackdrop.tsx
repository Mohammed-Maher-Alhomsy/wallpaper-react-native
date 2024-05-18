import { type StyleProp, StyleSheet, type ViewStyle } from "react-native";

import { BlurView } from "expo-blur";
import Animated, {
  SharedValue,
  interpolate,
  Extrapolation,
  useAnimatedStyle,
} from "react-native-reanimated";

type Props = {
  style: StyleProp<ViewStyle>;
  animatedIndex: SharedValue<number>;
};

const CustomBackdrop = ({ style, animatedIndex }: Props) => {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      animatedIndex?.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    );

    return {
      opacity,
    };
  });

  const containerStyle = [
    StyleSheet.absoluteFill,
    style,
    styles.overlay,
    containerAnimatedStyle,
  ];

  return (
    <Animated.View style={containerStyle}>
      <BlurView intensity={25} tint="dark" style={StyleSheet.absoluteFill} />
    </Animated.View>
  );
};

export default CustomBackdrop;

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
