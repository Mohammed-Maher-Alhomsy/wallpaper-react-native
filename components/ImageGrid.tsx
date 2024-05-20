import { StyleSheet, View } from "react-native";

import { MasonryFlashList } from "@shopify/flash-list";
import { ExpoRouter } from "expo-router/types/expo-router";

import { Hit } from "@/types";
import ImageCard from "./ImageCard";
import { getColumnCount, wp } from "@/helpers/common";

type Props = {
  images: Hit[];
  router: ExpoRouter.Router;
};

const ImageGrid = ({ images, router }: Props) => {
  const columnCount = getColumnCount();

  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={images}
        estimatedItemSize={200}
        numColumns={columnCount}
        renderItem={({ item, index }) => (
          <ImageCard
            item={item}
            index={index}
            router={router}
            columns={columnCount}
          />
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
