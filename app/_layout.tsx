import { Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#fff" },
        headerTintColor: "#000",
        headerTitleStyle: { fontWeight: "bold" },
        headerLeft: () => (
          <View style={{ paddingLeft: 15, marginRight: 10 }}>
            <FontAwesome name="book" size={24} color="#000" />
          </View>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ headerShown:false}} />
      <Stack.Screen name="home" options={{ title: "Daftar Surah" }} />
      <Stack.Screen name="DetailSurah" options={{ title: "Detail Surah" }} />
    </Stack>
  );
}
