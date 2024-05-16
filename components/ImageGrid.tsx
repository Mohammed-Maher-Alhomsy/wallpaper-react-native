import { StyleSheet, View } from "react-native";

import { MasonryFlashList } from "@shopify/flash-list";

import { Hit } from "@/types";
import ImageCard from "./ImageCard";
import { getColumnCount, wp } from "@/helpers/common";

type Props = {
  images: Hit[];
};

const ImageGrid = ({ images }: Props) => {
  const columnCount = getColumnCount();

  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={images}
        estimatedItemSize={200}
        numColumns={columnCount}
        renderItem={({ item, index }) => (
          <ImageCard index={index} item={item} columns={columnCount} />
        )}
        contentContainerStyle={styles.listContainerStyle}
      />
    </View>
  );
};

export default ImageGrid;

const styles = StyleSheet.create({
  container: {
    minHeight: 3,
    width: wp(100),
  },

  listContainerStyle: {
    paddingHorizontal: wp(4),
  },
});
