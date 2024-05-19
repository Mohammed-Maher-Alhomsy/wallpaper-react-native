import { Pressable, StyleSheet, View } from "react-native";

import { theme } from "@/constants/theme";
import { Filter, FilterName } from "@/types";

type Props = {
  data: string[];
  filters: Filter | null;
  filterName: FilterName;
  setFilters: React.Dispatch<React.SetStateAction<Filter | null>>;
};

const ColorFilter = ({ data, filterName, filters, setFilters }: Props) => {
  const onSelect = (item: string) => {
    if (filters) {
      setFilters({ ...filters, [filterName]: item });
    } else {
      setFilters({ [filterName]: item });
    }
  };

  return (
    <View style={styles.flexRowWrap}>
      {data &&
        data.map((item) => {
          let isActive = filters && filters[filterName] === item;
          let borderColor = isActive ? theme.colors.neutral(0.8) : "white";

          return (
            <Pressable key={item} onPress={onSelect.bind(this, item)}>
              <View style={[styles.colorWrapper, { borderColor }]}>
                <View style={[styles.color, { backgroundColor: item }]} />
              </View>
            </Pressable>
          );
        })}
    </View>
  );
};

export default ColorFilter;

const styles = StyleSheet.create({
  flexRowWrap: {
    gap: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  colorWrapper: {
    padding: 3,
    borderRadius: theme.radius.sm,
    borderWidth: 2,
    borderCurve: "continuous",
  },

  color: {
    height: 30,
    width: 40,
    borderRadius: theme.radius.sm - 3,
    borderCurve: "continuous",
  },
});
