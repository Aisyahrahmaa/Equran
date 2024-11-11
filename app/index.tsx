import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Hook untuk navigasi

export default function HomeScreen({ navigation }) {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [surahDetail, setSurahDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [ayat, setAyat] = useState([]);
  const [page, setPage] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  // Fetch data for all surahs
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

  useEffect(() => {
    fetchSurahData();
  }, []);

  // Fetch detail of selected surah
  const fetchSurahDetail = async (surahNumber) => {
    setLoadingDetail(true);
    setPage(0);
    setAyat([]); // Reset ayat when a new surah is selected

    try {
      const response = await fetch(`https://equran.id/api/v2/surat/${surahNumber}`);
      const data = await response.json();
      if (data && data.code === 200) {
        setSurahDetail(data.data);
        setAyat(data.data.ayat.slice(0, 10)); // Load only first 10 ayat initially
        navigation.navigate("DetailSurah", {
          surahName: data.data.namaLatin, // Pass the surah name to change header
        });
      } else {
        console.error("Data tidak ditemukan atau ada masalah dengan respons API:", data);
        setSurahDetail(null);
      }
    } catch (error) {
      console.error("Error fetching surah detail:", error);
    } finally {
      setLoadingDetail(false);
    }
  };

  // Load more ayat as user scrolls down
  const loadMoreAyat = useCallback(() => {
    if (loadingMore || !surahDetail) return;

    setLoadingMore(true);
    const newPage = page + 1;
    const startIndex = newPage * 10;
    const endIndex = startIndex + 10;
    setAyat((prevAyat) => [...prevAyat, ...surahDetail.ayat.slice(startIndex, endIndex)]);
    setPage(newPage);
    setLoadingMore(false);
  }, [page, loadingMore, surahDetail]);

  // Render each ayah
  const Ayat = React.memo(({ item }) => (
    <View style={styles.ayahCard}>
      <Text style={styles.ayahArabic}>{item.teksArab}</Text>
      <Text style={styles.ayahTranslation}>{item.teksIndonesia}</Text>
      <Text style={styles.ayahTransliteration}>{item.teksLatin}</Text>
    </View>
  ));

  // Render Surah list
  const renderSurahItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => fetchSurahDetail(item.nomor)}
    >
      <Text style={styles.surahName}>{item.namaLatin}</Text>
      <Text style={styles.surahInfo}>{item.tempatTurun} - {item.jumlahAyat} Ayat</Text>
      <Text style={styles.surahDesc}>{item.arti}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        !surahDetail ? (
          <FlatList
            data={surahs}
            keyExtractor={(item) => item.nomor.toString()}
            renderItem={renderSurahItem}
          />
        ) : (
          <FlatList
            ListHeaderComponent={() => (
              <View style={styles.header}>
                <Text style={styles.surahName}>{surahDetail.namaLatin}</Text>
                <Text style={styles.surahInfo}>
                  {surahDetail.arti} - {surahDetail.tempatTurun} - {surahDetail.jumlahAyat} Ayat
                </Text>
                <Text style={styles.surahDesc}>{surahDetail.deskripsi}</Text>
              </View>
            )}
            data={ayat}
            keyExtractor={(item) => item.nomorAyat.toString()}
            renderItem={({ item }) => <Ayat item={item} />}
            initialNumToRender={10}
            maxToRenderPerBatch={5}
            removeClippedSubviews={true}
            windowSize={5}
            onEndReached={loadMoreAyat}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loadingMore && <ActivityIndicator size="small" color="#0000ff" />}
          />
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  surahName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  surahInfo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  surahDesc: {
    fontSize: 16,
    color: "#444",
  },
  header: {
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 15,
  },
  ayahCard: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
  },
  ayahArabic: {
    fontSize: 20,
    textAlign: "right",
    color: "#333",
    marginBottom: 10,
  },
  ayahTranslation: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  ayahTransliteration: {
    fontSize: 14,
    color: "#888",
    fontStyle: "italic",
  },
});
