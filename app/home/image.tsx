import { useState } from "react";
import {
  Text,
  View,
  Button,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { BlurView } from "expo-blur";
import { Image, ImageLoadEventData } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";

import { wp } from "@/helpers/common";
import { theme } from "@/constants/theme";

const ImageScreen = () => {
  const item = useLocalSearchParams();
  const [status, setStatus] = useState("loading");

  const uri = item?.webformatURL;

  const onLoad = (e: ImageLoadEventData) => {
    setStatus("");
  };

  const getSize = () => {
    const aspectRatio = +item?.imageWidth! / +item?.imageHeight!;

    const maxWidth = Platform.OS === "web" ? wp(50) : wp(92);
    let calculatedHeight = maxWidth / aspectRatio;
    let calculatedWidth = maxWidth;

    if (aspectRatio < 1) {
      // portrait
      calculatedWidth = calculatedHeight * aspectRatio;
    }

    return {
      width: calculatedWidth,
      height: calculatedHeight,
    };
  };

  return (
    <BlurView tint="dark" intensity={60} style={styles.container}>
      <View style={getSize()}>
        <View style={styles.loading}>
          {status === "loading" && (
            <ActivityIndicator size="large" color="white" />
          )}
        </View>

        <Image
          source={uri}
          onLoad={onLoad}
          transition={100}
          style={[styles.image, getSize()]}
        />
      </View>

      <Button title="Back" onPress={() => router.back()} />
    </BlurView>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: wp(4),
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  image: {
    borderWidth: 2,
    borderRadius: theme.radius.lg,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.1)",
  },

  loading: {
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
