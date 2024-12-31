import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ImageBackground
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

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
    <ImageBackground
    style={styles.container}
    source={require('../assets/images/bgquran.jpeg')} 
    >

   
    
      {/* Menambahkan StatusBar dengan background putih */}
      <StatusBar style="dark" backgroundColor="#fff" />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={surahs}
          keyExtractor={(item) => item.nomor.toString()}
          renderItem={renderSurahItem}
        />
      )}
       </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  card: {
    backgroundColor: "#C0D6E8",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  surahName: { fontSize: 18, fontWeight: "bold",color:"#fff" },
  surahInfo: { fontSize: 14, marginBottom: 5, color: "#fff" },
  surahDesc: { fontSize: 16, color: "#fff" },
});
