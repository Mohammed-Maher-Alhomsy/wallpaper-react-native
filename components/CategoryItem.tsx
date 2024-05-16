import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";

type Props = {
  index: number;
  title: string;
  isActive: boolean;
  onChange: (cat: string | null) => void;
};

const CategoryItem = ({ title, isActive, index, onChange }: Props) => {
  let color = isActive ? theme.colors.white : theme.colors.neutral(0.8);
  let backgroundColor = isActive
    ? theme.colors.neutral(0.8)
    : theme.colors.white;

  return (
    <Animated.View
      entering={FadeInRight.delay(index * 200)
        .duration(1000)
        .springify()
        .damping(14)}
    >
      <Pressable
        onPress={() => onChange(isActive ? null : title)}
        style={[styles.category, { backgroundColor }]}
      >
        <Text style={[styles.title, { color }]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  category: {
    padding: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    // backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    borderCurve: "continuous",
  },

  title: {
    fontSize: hp(1.8),
    fontWeight: theme.fontWeights.medium as "500",
  },
});
