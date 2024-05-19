import { useCallback, useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  Pressable,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { debounce } from "lodash";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";

import { apiCall } from "@/api";
import { Filter, FilterName, Hit } from "@/types";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import ImageGrid from "@/components/ImageGrid";
import Categories from "@/components/Categories";
import FilterModal from "@/components/FilterModal";

let page = 1;

const Page = () => {
  const [search, setSearch] = useState("");
  const [images, setImages] = useState<Hit[]>([]);
  const modalRef = useRef<BottomSheetModal>(null);
  const searchInputRef = useRef<TextInput | null>(null);
  const [filters, setFilters] = useState<Filter | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleChangeCategory = (cat: string | null) => {
    setActiveCategory(cat);
    clearSearch();
    setImages([]);

    page = 1;
    const params = new Map();
    params.set("page", page);

    if (filters) {
      params.set("colors", filters.colors);
      params.set("order", filters.order);
      params.set("orientation", filters.orientation);
      params.set("image_type", filters.type);
    }

    if (cat) params.set("category", cat);

    const paramsObj = Object.fromEntries(params);
    fetchImages(paramsObj, false);
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
      setActiveCategory(null);
      // @ts-ignore
      fetchImages({ page, q: text, ...filters }, false);
    }

    if (text === "") {
      page = 1;
      searchInputRef.current?.clear();

      setImages([]);
      setActiveCategory(null);
      fetchImages({ page, ...filters }, false);
    }
  };

  const clearSearch = () => {
    setSearch("");
    searchInputRef.current?.clear();
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  const openFilterModal = useCallback(() => {
    modalRef.current?.present();
  }, []);

  const closeFilterModal = useCallback(() => {
    modalRef.current?.close();
  }, []);

  const applyFilters = () => {
    if (filters) {
      page = 1;
      setImages([]);

      const params = new Map();
      params.set("page", page);
      params.set("colors", filters.colors);
      params.set("order", filters.order);
      params.set("orientation", filters.orientation);
      params.set("image_type", filters.type);

      if (activeCategory) params.set("category", activeCategory);
      if (search) params.set("q", search);

      const paramsObj = Object.fromEntries(params);
      fetchImages(paramsObj, false);
    }
    closeFilterModal();
  };

  const resetFilters = () => {
    if (filters) {
      setFilters(null);
      setImages([]);
      const params = new Map();
      params.set("page", page);

      if (activeCategory) params.set("category", activeCategory);
      if (search) params.set("q", search);

      const paramsObj = Object.fromEntries(params);
      fetchImages(paramsObj, false);
    }
    closeFilterModal();
  };

  const clearThisFilter = (filterName: FilterName) => {
    const newFilter = { ...filters };
    delete newFilter[filterName];

    setFilters({ ...newFilter });
    setImages([]);
    page = 1;

    const params = new Map();
    params.set("page", page);
    if (filters) {
      params.set("colors", filters.colors);
      params.set("order", filters.order);
      params.set("orientation", filters.orientation);
      params.set("image_type", filters.type);
    }

    if (activeCategory) params.set("category", activeCategory);
    if (search) params.set("q", search);

    const paramsObj = Object.fromEntries(params);
    fetchImages(paramsObj, false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.title}>Piexels</Text>
        </Pressable>

        <Pressable onPress={openFilterModal}>
          <FontAwesome6
            size={22}
            name="bars-staggered"
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
            placeholderTextColor="black"
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

        <View>
          <Categories
            activeCategoty={activeCategory}
            onChange={handleChangeCategory}
          />
        </View>

        {filters && (
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filers}
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
                    onPress={() => clearThisFilter(key as FilterName)}
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
        )}

        <View>{images.length > 0 && <ImageGrid images={images} />}</View>

        <View
          style={{ marginBottom: 70, marginTop: images.length > 0 ? 10 : 70 }}
        >
          <ActivityIndicator size="large" />
        </View>
      </ScrollView>

      <FilterModal
        filters={filters}
        modalRef={modalRef}
        onApply={applyFilters}
        onReset={resetFilters}
        setFilters={setFilters}
        onClose={closeFilterModal}
      />
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

  filers: {
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
