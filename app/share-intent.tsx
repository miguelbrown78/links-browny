import { useShareIntent } from "expo-share-intent";
import { StyleSheet, Text, View } from "react-native";

export default function ShareIntentScreen() {
  const { shareIntent, resetShareIntent, error } = useShareIntent();

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  if (!shareIntent) {
    return (
      <View style={styles.container}>
        <Text>Esperando contenido compartido...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contenido recibido:</Text>
      {shareIntent.text && (
        <Text style={styles.content}>{shareIntent.text}</Text>
      )}
      {shareIntent.webUrl && (
        <Text style={styles.content}>{shareIntent.webUrl}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  content: {
    fontSize: 16,
    color: "#333",
  },
  error: {
    color: "red",
  },
});