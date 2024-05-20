import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import { Filter, FilterName } from "@/types";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  filters: Filter;
  onClearFilters: (key: FilterName) => void;
};

const FiltersSection = ({ filters, onClearFilters }: Props) => {
  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}
      >
        {Object.keys(filters).map((key) => (
          <View key={key} style={styles.filterItem}>
            {key === "colors" ? (
              <View
                style={{
                  height: 20,
                  width: 30,
                  borderRadius: 7,
                  backgroundColor: filters[key],
                }}
              />
            ) : (
              <Text style={styles.filterItemText}>
                {filters[key as FilterName]}
              </Text>
            )}

            <Pressable
              style={styles.filterCloseIcon}
              onPress={onClearFilters.bind(this, key as FilterName)}
            >
              <Ionicons
                name="close"
                size={14}
                color={theme.colors.neutral(0.9)}
              />
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default FiltersSection;

const styles = StyleSheet.create({
  filters: {
    paddingHorizontal: wp(4),
    gap: 10,
  },

  filterItem: {
    padding: 8,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: theme.radius.xs,
    backgroundColor: theme.colors.grayBG,
  },

  filterItemText: {
    fontSize: hp(1.9),
  },

  filterCloseIcon: {
    padding: 4,
    borderRadius: 7,
    backgroundColor: theme.colors.neutral(0.2),
  },
});
