import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack screenOptions={{ statusBarStyle: "dark" }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;

const styles = StyleSheet.create({});
