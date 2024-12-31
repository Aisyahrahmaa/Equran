import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from "react-native";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";

export default function Index() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../assets/images/quran.jpeg')} 
      style={styles.container}
    >
     
      <BlurView intensity={100} style={styles.blurContainer}>
        
        <Image 
          source={require('../assets/images/kaligrafi.png')}  
          style={styles.logoKaligrafi}
          resizeMode="contain"
        />
        <Image 
          source={require('../assets/images/islami.png')}
          style={styles.logoAlQuran}
          resizeMode="contain"
        />
        
        
        <TouchableOpacity style={styles.button} onPress={() => router.push("/home")}>
          <Text style={styles.buttonText}>BACA ALQUR'AN</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
          <Text style={styles.buttonText}>TERAKHIR BACA</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
          <Text style={styles.buttonText}>PENCARIAN</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
          <Text style={styles.buttonText}>JADWAL SHOLAT</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => router.push("/")}>
          <Text style={styles.buttonText}>PENGATURAN</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.copyright}>𝐀𝐢𝐬𝐲𝐚𝐭𝐮𝐫 𝐫𝐨𝐡𝐦𝐚𝐡</Text>
        </View>
      </BlurView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center", 
  },
  blurContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: '100%',
    height: '100%',
  },
  logoKaligrafi: {
    width: 100,      
    height: 100,
    marginBottom:-30,     
  },
  logoAlQuran: {
    width: 100,
    height: 120,     
    marginBottom:-30, 
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 140,
    height: 40,
    backgroundColor: "rgba(112, 163, 204,0.7)", 
    borderRadius: 8,
    marginBottom: 5,
  },
  buttonText: {
    color: "#fff", 
    fontSize: 16,
    fontWeight: "bold", 
    textAlign: 'center',
  },
  copyright: {
    color:'rgba(112, 163, 204,0.7)',
    transform: [{ translateY:35 }],
  }
});
