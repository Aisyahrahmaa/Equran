import { Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "rgb(112, 163, 204)" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        headerLeft: () => (
          <View style={{ paddingLeft: 15, marginRight: 10 }}>
            <FontAwesome name="book" size={24} color="#fff" />
          </View>
        ),
        headerRight: () => (
          <View style={{ flexDirection: "row", paddingRight: 15 }}>
            <FontAwesome  name="search" size={24} color="#fff" style={{ marginRight: 15 }} />
            <FontAwesome name="ellipsis-h" size={24} color="#fff" />
          </View>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ title: "Daftar Surah" }} />
      <Stack.Screen name="DetailSurah" options={{ title: "Detail Surah" }} />
    </Stack>
  );
}
