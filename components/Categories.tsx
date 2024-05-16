import { FlatList, StyleSheet, Text, View } from "react-native";

import { wp } from "@/helpers/common";
import { data } from "@/constants/data";
import CategoryItem from "./CategoryItem";

type Props = {
  activeCategoty: string | null;
  onChange: (cat: string | null) => void;
};

const Categories = ({ activeCategoty, onChange }: Props) => {
  return (
    <FlatList
      horizontal
      data={data.categories}
      keyExtractor={(item) => item}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.flatListContainer}
      renderItem={({ item, index }) => (
        <CategoryItem
          title={item}
          index={index}
          onChange={onChange}
          isActive={activeCategoty === item}
        />
      )}
    />
  );
};

export default Categories;

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: wp(4),
    gap: 8,
  },
});
