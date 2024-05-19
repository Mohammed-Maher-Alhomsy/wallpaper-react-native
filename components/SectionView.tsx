import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import { StyleSheet, Text, View } from "react-native";

type Props = { title: string; content: any };

const SectionView = ({ title, content }: Props) => {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <View>{content}</View>
    </View>
  );
};

export default SectionView;

const styles = StyleSheet.create({
  sectionContainer: {
    gap: 8,
  },

  sectionTitle: {
    fontSize: hp(2.4),
    fontWeight: theme.fontWeights.medium as "500",
    color: theme.colors.neutral(0.8),
  },
});
