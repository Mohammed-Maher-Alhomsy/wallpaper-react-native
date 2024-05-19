import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

import SectionView from "./SectionView";
import { data } from "@/constants/data";
import { theme } from "@/constants/theme";
import CustomBackdrop from "./CustomBackdrop";
import CommonFilterRow from "./CommonFilterRow";
import { capitalize, hp } from "@/helpers/common";
import { Filter, FilterName, Section } from "@/types";

type Props = {
  filters: Filter | null;
  modalRef: React.RefObject<BottomSheetModal>;
  setFilters: React.Dispatch<React.SetStateAction<Filter | null>>;
  onClose: () => void;
  onApply: () => void;
  onReset: () => void;
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
              <View key={sectionName}>
                <SectionView
                  title={title}
                  content={sectionView({
                    filters,
                    setFilters,
                    filterName,
                    data: sectionData,
                  })}
                />
              </View>
            );
          })}
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const sections = {
  order: (props: Section) => <CommonFilterRow {...props} />,
  orientation: (props: Section) => <CommonFilterRow {...props} />,
  type: (props: Section) => <CommonFilterRow {...props} />,
  colors: (props: Section) => <CommonFilterRow {...props} />,
};

export default FilterModal;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },

  content: {
    // flex: 1,
    width: "100%",
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
});
