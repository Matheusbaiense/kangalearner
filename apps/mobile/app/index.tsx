import { Text, View } from "react-native";

export default function MobileHome() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: "700", marginBottom: 8 }}>KangaLearner Mobile</Text>
      <Text>Expo scaffold ready. Next step is migrating screens and quiz flow.</Text>
    </View>
  );
}
