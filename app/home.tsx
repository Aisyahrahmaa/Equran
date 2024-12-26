import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurahData = async () => {
      try {
        const response = await fetch("https://equran.id/api/v2/surat");
        const data = await response.json();
        setSurahs(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchSurahData();
  }, []);

  const renderSurahItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/DetailSurah?surah=${item.nomor}`)}
    >
      <Text style={styles.surahName}>{item.namaLatin}</Text>
      <Text style={styles.surahInfo}>
        {item.tempatTurun} - {item.jumlahAyat} Ayat
      </Text>
      <Text style={styles.surahDesc}>{item.arti}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={surahs}
          keyExtractor={(item) => item.nomor.toString()}
          renderItem={renderSurahItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  card: {
    backgroundColor: "#FFF8E6",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  surahName: { fontSize: 18, fontWeight: "bold" },
  surahInfo: { fontSize: 14, marginBottom: 5 },
  surahDesc: { fontSize: 16 },
});
