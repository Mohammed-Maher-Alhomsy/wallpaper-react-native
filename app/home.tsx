import { useCallback, useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  Pressable,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";

import { debounce } from "lodash";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";

import { Hit } from "@/types";
import { apiCall } from "@/api";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import ImageGrid from "@/components/ImageGrid";
import Categories from "@/components/Categories";

let page = 1;

const Page = () => {
  const [search, setSearch] = useState("");
  const [images, setImages] = useState<Hit[]>([]);
  const searchInputRef = useRef<TextInput | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleChangeCategory = (value: string | null) => {
    setActiveCategory(value);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async (params = { page: 1 }, append = false) => {
    let res = await apiCall(params);

    if (res.success && res.data?.hits) {
      if (append) {
        setImages((prev) => [...prev, ...res.data?.hits]);
      } else {
        setImages([...res.data.hits]);
      }
    }
  };

  const handleSearch = (text: string) => {
    setSearch(text);

    if (text.length > 2) {
      page = 1;

      setImages([]);
      // @ts-ignore
      fetchImages({ page, q: text });
    }

    if (text === "") {
      page = 1;
      searchInputRef.current?.clear();

      setImages([]);
      fetchImages({ page });
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

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
              size={24}
              name="search"
              color={theme.colors.neutral(0.4)}
            />
          </View>

          <TextInput
            // value={search}
            ref={searchInputRef}
            style={styles.searchInput}
            onChangeText={handleTextDebounce}
            placeholder="Search fot photo..."
          />

          {search && (
            <Pressable
              style={styles.closeIcon}
              onPress={() => handleSearch("")}
            >
              <Ionicons
                name="close"
                size={24}
                color={theme.colors.neutral(0.6)}
              />
            </Pressable>
          )}
        </View>

        <View style={styles.categories}>
          <Categories
            activeCategoty={activeCategory}
            onChange={handleChangeCategory}
          />
        </View>

        <View>{images.length > 0 && <ImageGrid images={images} />}</View>
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

  categories: {},
});
