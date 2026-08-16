import { Tabs } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BookOpen, ClipboardCheck, Home, UserRound, Wand2 } from "lucide-react-native";
import {
  PreferencesProvider,
  usePreferences
} from "../src/features/preferences/PreferencesContext";
import { colors } from "../src/theme";

function RootTabs() {
  const { copy } = usePreferences();
  return (
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
          title: copy.home,
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: copy.learn,
          tabBarIcon: ({ color, size }) => <BookOpen color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          title: copy.practice,
          tabBarIcon: ({ color, size }) => <Wand2 color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="mock-test"
        options={{
          title: copy.mockTab,
          tabBarIcon: ({ color, size }) => <ClipboardCheck color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: copy.profile,
          tabBarIcon: ({ color, size }) => <UserRound color={color} size={size} />
        }}
      />
      <Tabs.Screen name="auth/callback" options={{ href: null, headerShown: false }} />
    </Tabs>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PreferencesProvider>
        <RootTabs />
      </PreferencesProvider>
    </GestureHandlerRootView>
  );
}
