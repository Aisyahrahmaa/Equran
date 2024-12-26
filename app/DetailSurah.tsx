import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function DetailSurah() {
  const { surah } = useLocalSearchParams(); // Ambil nomor surah dari query parameter
  const [surahDetail, setSurahDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurahDetail = async () => {
      try {
        const response = await fetch(`https://equran.id/api/v2/surat/${surah}`);
        const data = await response.json();
        if (data.code === 200) {
          setSurahDetail(data.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching surah detail: ", error);
        setLoading(false);
      }
    };

    fetchSurahDetail();
  }, [surah]);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View>
          <Text style={styles.surahName}>{surahDetail.namaLatin}</Text>
          <Text style={styles.surahInfo}>
            {surahDetail.arti} - {surahDetail.tempatTurun} - {surahDetail.jumlahAyat} Ayat
          </Text>
          <FlatList
            data={surahDetail.ayat}
            keyExtractor={(item) => item.nomorAyat.toString()}
            renderItem={({ item }) => (
              <View style={styles.ayahCard}>
                <Text style={styles.ayahArabic}>{item.teksArab}</Text>
                <Text style={styles.ayahTranslation}>{item.teksIndonesia}</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  surahName: { fontSize: 20, fontWeight: "bold" },
  surahInfo: { fontSize: 16, marginBottom: 10 },
  ayahCard: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  ayahArabic: { fontSize: 20, textAlign: "right" },
  ayahTranslation: { fontSize: 16, marginTop: 5 },
});
