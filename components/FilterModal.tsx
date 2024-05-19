import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

import SectionView from "./SectionView";
import { data } from "@/constants/data";
import ColorFilter from "./ColorFilter";
import { theme } from "@/constants/theme";
import CustomBackdrop from "./CustomBackdrop";
import CommonFilterRow from "./CommonFilterRow";
import { capitalize, hp } from "@/helpers/common";
import { Filter, FilterName, Section } from "@/types";
import Animated, { FadeInUp } from "react-native-reanimated";

type Props = {
  filters: Filter | null;
  modalRef: React.RefObject<BottomSheetModal>;
  setFilters: React.Dispatch<React.SetStateAction<Filter | null>>;
  onClose: () => void;
  onApply: () => void;
  onReset: () => void;
};

const sections = {
  order: (props: Section) => <CommonFilterRow {...props} />,
  orientation: (props: Section) => <CommonFilterRow {...props} />,
  type: (props: Section) => <CommonFilterRow {...props} />,
  colors: (props: Section) => <ColorFilter {...props} />,
};

const FilterModal = ({
  modalRef,
  onClose,
  onApply,
  onReset,
  filters,
  setFilters,
}: Props) => {
  const snapPoints = useMemo(() => ["75%"], []);

  return (
    <BottomSheetModal
      index={0}
      ref={modalRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: "#d9d9d9" }}
      backdropComponent={({ style, animatedIndex }) => (
        <CustomBackdrop style={style} animatedIndex={animatedIndex} />
      )}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.filterText}>Filters</Text>
          {Object.keys(sections).map((sectionName, index) => {
            let title = capitalize(sectionName);
            let filterName = sectionName as FilterName;
            let sectionView = sections[sectionName as FilterName];
            let sectionData = data.filters[sectionName as FilterName];

            return (
              <Animated.View
                entering={FadeInUp.duration(400 * (index + 1))
                  .delay(300 * (index + 1))
                  .springify()}
                key={sectionName}
              >
                <SectionView
                  title={title}
                  content={sectionView({
                    filters,
                    setFilters,
                    filterName,
                    data: sectionData,
                  })}
                />
              </Animated.View>
            );
          })}

          <Animated.View
            entering={FadeInUp.duration(400).delay(1500).springify()}
            style={styles.buttons}
          >
            <Pressable style={styles.resetButton} onPress={onReset}>
              <Text
                style={[
                  styles.buttonText,
                  { color: theme.colors.neutral(0.9) },
                ]}
              >
                Reset
              </Text>
            </Pressable>

            <Pressable style={styles.applyButton} onPress={onApply}>
              <Text style={[styles.buttonText, { color: theme.colors.white }]}>
                Apply
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },

  content: {
    // flex: 1,
    // width: "100%",
    gap: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  filterText: {
    fontSize: hp(4),
    marginBottom: 5,
    color: theme.colors.neutral(0.8),
    fontWeight: theme.fontWeights.semibold as "600",
  },

  buttons: {
    flex: 1,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  buttonText: {
    fontSize: hp(2.2),
  },

  applyButton: {
    flex: 1,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    borderCurve: "continuous",
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.neutral(0.8),
  },

  resetButton: {
    flex: 1,
    padding: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    borderCurve: "continuous",
    borderRadius: theme.radius.md,
    borderColor: theme.colors.grayBG,
    backgroundColor: theme.colors.neutral(0.03),
  },
});
