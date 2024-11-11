// import React, { useEffect, useState, useCallback } from "react";
// import { Text, View, FlatList, ActivityIndicator, StyleSheet, ScrollView } from "react-native";

// export default function DetailSurah({ route }) {
//   const surahNumber = route?.params?.surahNumber;
//   const [surahDetail, setSurahDetail] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [ayat, setAyat] = useState([]);
//   const [page, setPage] = useState(0);
//   const [loadingMore, setLoadingMore] = useState(false);

//   const fetchSurahDetail = async () => {
//     if (!surahNumber) return;

//     try {
//       const response = await fetch(`https://equran.id/api/v2/surat/${surahNumber}`);
//       const data = await response.json();
//       if (data && data.code === 200) {
//         setSurahDetail(data.data);
//         setAyat(data.data.ayat.slice(0, 10)); // Load only first 10 ayat initially
//       } else {
//         console.error("Data tidak ditemukan atau ada masalah dengan respons API:", data);
//         setSurahDetail(null);
//       }
//     } catch (error) {
//       console.error("Error fetching surah detail:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSurahDetail();
//   }, [surahNumber]);

//   // Load more ayat as user scrolls down
//   const loadMoreAyat = useCallback(() => {
//     if (loadingMore || !surahDetail) return;

//     setLoadingMore(true);
//     const newPage = page + 1;
//     const startIndex = newPage * 10;
//     const endIndex = startIndex + 10;
//     setAyat((prevAyat) => [...prevAyat, ...surahDetail.ayat.slice(startIndex, endIndex)]);
//     setPage(newPage);
//     setLoadingMore(false);
//   }, [page, loadingMore, surahDetail]);

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (!surahDetail) {
//     return <Text style={styles.errorText}>Error loading surah details.</Text>;
//   }

//   const Ayat = React.memo(({ item }) => (
//     <View style={styles.ayahCard}>
//       <Text style={styles.ayahArabic}>{item.teksArab}</Text>
//       <Text style={styles.ayahTranslation}>{item.teksIndonesia}</Text>
//       <Text style={styles.ayahTransliteration}>{item.teksLatin}</Text>
//     </View>
//   ));

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.surahName}>{surahDetail.namaLatin}</Text>
//         <Text style={styles.surahInfo}>
//           {surahDetail.arti} - {surahDetail.tempatTurun} - {surahDetail.jumlahAyat} Ayat
//         </Text>
//         <Text style={styles.surahDesc}>{surahDetail.deskripsi}</Text>
//       </View>
//       <FlatList
//         data={ayat}
//         keyExtractor={(item) => item.nomorAyat.toString()}
//         renderItem={({ item }) => <Ayat item={item} />}
//         initialNumToRender={10}
//         maxToRenderPerBatch={5}
//         removeClippedSubviews={true}
//         windowSize={5}
//         onEndReached={loadMoreAyat}
//         onEndReachedThreshold={0.5}
//         ListFooterComponent={loadingMore && <ActivityIndicator size="small" color="#0000ff" />}
//       />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f8f9fa",
//     padding: 10,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   errorText: {
//     color: "red",
//     textAlign: "center",
//     marginTop: 20,
//   },
//   header: {
//     paddingBottom: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: "#ddd",
//     marginBottom: 15,
//   },
//   surahName: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   surahInfo: {
//     fontSize: 16,
//     color: "#666",
//     marginBottom: 5,
//   },
//   surahDesc: {
//     fontSize: 14,
//     color: "#444",
//     fontStyle: "italic",
//   },
//   ayahCard: {
//     padding: 15,
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   ayahArabic: {
//     fontSize: 20,
//     textAlign: "right",
//     color: "#333",
//     marginBottom: 10,
//   },
//   ayahTranslation: {
//     fontSize: 16,
//     color: "#555",
//     marginBottom: 5,
//   },
//   ayahTransliteration: {
//     fontSize: 14,
//     color: "#888",
//     fontStyle: "italic",
//   },
// });
