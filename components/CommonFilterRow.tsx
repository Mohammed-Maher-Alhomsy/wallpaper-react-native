import { Pressable, StyleSheet, Text, View } from "react-native";

import { theme } from "@/constants/theme";
import { Filter, FilterName } from "@/types";
import { capitalize } from "@/helpers/common";

type Props = {
  data: string[];
  filters: Filter | null;
  filterName: FilterName;
  setFilters: React.Dispatch<React.SetStateAction<Filter | null>>;
};

const CommonFilterRow = ({ data, filterName, filters, setFilters }: Props) => {
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

          let color = isActive ? "white" : theme.colors.neutral(0.7);
          let backgroundColor = isActive ? theme.colors.neutral(0.7) : "white";

          return (
            <Pressable
              key={item}
              onPress={onSelect.bind(this, item)}
              style={[styles.outlinedButton, { backgroundColor }]}
            >
              <Text style={[styles.outlineButtonText, { color }]}>
                {capitalize(item)}
              </Text>
            </Pressable>
          );
        })}
    </View>
  );
};

export default CommonFilterRow;

const styles = StyleSheet.create({
  flexRowWrap: {
    gap: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  outlinedButton: {
    padding: 8,
    borderWidth: 1,
    paddingHorizontal: 14,
    borderCurve: "continuous",
    borderRadius: theme.radius.xs,
    borderColor: theme.colors.grayBG,
  },

  outlineButtonText: {},
});
