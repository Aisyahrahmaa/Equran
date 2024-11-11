import { Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons"; // Import ikon FontAwesome
import { View } from "react-native";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        // Menambahkan ikon di bagian kiri header
        headerLeft: () => (
          <View style={{ paddingLeft: 15, marginRight: 10 }}>
            <FontAwesome name="book" size={24} color="#000" />
          </View>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ title: "Daftar Surah" }} />
      {/* Header title akan berubah sesuai nama surah */}
    </Stack>
  );
}
