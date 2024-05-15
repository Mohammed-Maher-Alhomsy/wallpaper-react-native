import { useRef, useState } from "react";
import {
  Text,
  View,
  Pressable,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";

import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";

const Page = () => {
  const [search, setSearch] = useState("");
  const searchInputRef = useRef<TextInput | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.title}>Piexels</Text>
        </Pressable>

        <Pressable>
          <FontAwesome6
            name="bars-staggered"
            size={22}
            color={theme.colors.neutral(0.7)}
          />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ gap: 15 }}>
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <Feather
              name="search"
              size={24}
              color={theme.colors.neutral(0.4)}
            />
          </View>

          <TextInput
            value={search}
            ref={searchInputRef}
            onChangeText={setSearch}
            style={styles.searchInput}
            placeholder="Search fot photo..."
          />

          {search && (
            <Pressable style={styles.closeIcon}>
              <Ionicons
                name="close"
                size={24}
                color={theme.colors.neutral(0.6)}
              />
            </Pressable>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },

  header: {
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: wp(4),
    justifyContent: "space-between",
  },

  title: {
    fontSize: hp(4),
    color: theme.colors.neutral(0.9),
    fontWeight: theme.fontWeights.bold as "700",
  },

  searchBar: {
    padding: 6,
    borderWidth: 1,
    paddingLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp(4),
    borderRadius: theme.radius.lg,
    justifyContent: "space-between",
    borderColor: theme.colors.grayBG,
    backgroundColor: theme.colors.white,
  },

  searchIcon: { padding: 8 },

  searchInput: {
    flex: 1,
    fontSize: hp(1.8),
    paddingVertical: 10,
    borderRadius: theme.radius.sm,
  },

  closeIcon: {
    padding: 8,
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.neutral(0.1),
  },
});
