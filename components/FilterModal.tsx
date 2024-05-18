import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

import CustomBackdrop from "./CustomBackdrop";
import { hp } from "@/helpers/common";
import { theme } from "@/constants/theme";

type Props = {
  modalRef: React.RefObject<BottomSheetModal>;
};

const FilterModal = ({ modalRef }: Props) => {
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
          <Text style={styles.filterText}>Sections here</Text>
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
