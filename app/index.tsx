// app/index.tsx

import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/login"); // Redirect to FrontPage after loading
    }, 1000); // 1-second delay

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.text}>Welcome Back!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  text: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
});
