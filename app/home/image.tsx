import { useState } from "react";
import {
  View,
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";

import { Image } from "expo-image";
import { BlurView } from "expo-blur";
import * as Sharing from "expo-sharing";
import Toast, { BaseToast } from "react-native-toast-message";
import * as FileSystem from "expo-file-system";
import { router, useLocalSearchParams } from "expo-router";
import Animated, { FadeInDown } from "react-native-reanimated";

import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import { Entypo, Octicons } from "@expo/vector-icons";

const ImageScreen = () => {
  const item = useLocalSearchParams();
  const [status, setStatus] = useState("loading");

  const uri = item?.webformatURL as string;
  const fileName = (item?.previewURL as string)?.split("/").pop();
  const imageUrl = uri;
  const filePath = `${FileSystem.documentDirectory}${fileName}`;

  const onLoad = () => {
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

  const downloadFile = async () => {
    try {
      const { uri } = await FileSystem.downloadAsync(imageUrl, filePath);
      setStatus("");
      return uri;
    } catch (error) {
      setStatus("");
      Alert.alert("Image", (error as Error).message);
      return null;
    }
  };

  const handleDownloadImage = async () => {
    setStatus("downloading");
    const uri = await downloadFile();

    if (uri) {
      showToast("Image downloaded successfully");
    }
  };

  const handleShareImage = async () => {
    setStatus("sharing");

    let uri = await downloadFile();

    if (uri) {
      // share image
      await Sharing.shareAsync(uri);
    }
  };

  const showToast = (message: string) => {
    Toast.show({
      type: "success",
      text1: message,
      position: "bottom",
    });
  };

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={styles.toast}
        text1Style={styles.toastText}
      />
    ),
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

      <View style={styles.buttons}>
        <Animated.View entering={FadeInDown.springify()}>
          <Pressable style={styles.button} onPress={() => router.back()}>
            <Octicons name="x" size={24} color="white" />
          </Pressable>
        </Animated.View>

        <Animated.View entering={FadeInDown.springify().delay(100)}>
          {status === "downloading" ? (
            <ActivityIndicator size={24} color="white" />
          ) : (
            <Pressable style={styles.button} onPress={handleDownloadImage}>
              <Octicons name="download" size={24} color="white" />
            </Pressable>
          )}
        </Animated.View>

        <Animated.View entering={FadeInDown.springify().delay(200)}>
          {status === "sharing" ? (
            <ActivityIndicator size={24} color="white" />
          ) : (
            <Pressable style={styles.button} onPress={handleShareImage}>
              <Entypo name="share" size={22} color="white" />
            </Pressable>
          )}
        </Animated.View>
      </View>

      <Toast config={toastConfig} />
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

  buttons: {
    marginTop: 40,
    gap: 50,
    flexDirection: "row",
    alignItems: "center",
  },

  button: {
    width: hp(6),
    height: hp(6),
    alignItems: "center",
    justifyContent: "center",
    borderCurve: "continuous",
    borderRadius: theme.radius.lg,
    backgroundColor: "rgba(255,255,255,0.2)",
  },

  toast: {
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: theme.radius.xl,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
  },

  toastText: {
    fontSize: hp(1.8),
    fontWeight: theme.fontWeights.semibold as "600",
    color: theme.colors.white,
  },
});
