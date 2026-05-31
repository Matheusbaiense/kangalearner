import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BookOpen, ClipboardCheck, Home, UserRound, Wand2 } from "lucide-react-native";
import { PreferencesProvider } from "../src/features/preferences/PreferencesContext";
import { colors } from "../src/theme";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PreferencesProvider>
        <Tabs
          screenOptions={{
            headerShadowVisible: false,
            tabBarActiveTintColor: colors.green,
            tabBarInactiveTintColor: "#7A8DA3",
            tabBarStyle: {
              minHeight: 66,
              paddingTop: 8
            }
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color, size }) => <Home color={color} size={size} />
            }}
          />
          <Tabs.Screen
            name="learn"
            options={{
              title: "Learn",
              tabBarIcon: ({ color, size }) => <BookOpen color={color} size={size} />
            }}
          />
          <Tabs.Screen
            name="practice"
            options={{
              title: "Practice",
              tabBarIcon: ({ color, size }) => <Wand2 color={color} size={size} />
            }}
          />
          <Tabs.Screen
            name="mock-test"
            options={{
              title: "Mock",
              tabBarIcon: ({ color, size }) => <ClipboardCheck color={color} size={size} />
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ color, size }) => <UserRound color={color} size={size} />
            }}
          />
        </Tabs>
      </PreferencesProvider>
    </GestureHandlerRootView>
  );
}
