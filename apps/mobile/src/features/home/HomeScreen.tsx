import { BookOpen, ClipboardCheck, Languages, WifiOff } from "lucide-react-native";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { AU_STATE_OPTIONS, CATEGORIES, QUESTIONS } from "../../lib/questions";
import { LANG_OPTIONS } from "../../lib/i18n";
import { Card, PillButton, PrimaryButton, Screen, Stat, useThemeColors } from "../../ui/kit";
import { colors, spacing } from "../../theme";
import { usePreferences } from "../preferences/PreferencesContext";

export function HomeScreen() {
  const c = useThemeColors();
  const { state, lang, setStateCode, setLang, copy } = usePreferences();
  const available = AU_STATE_OPTIONS.map((item) => item.code);

  return (
    <Screen>
      <Card tone="brand" style={{ paddingTop: 30 }}>
        <Text selectable style={{ color: "#B6F1D1", fontSize: 13, fontWeight: "900" }}>
          FOR IMMIGRANTS IN WESTERN AUSTRALIA
        </Text>
        <Text selectable style={{ color: "#fff", fontSize: 38, fontWeight: "900", lineHeight: 44 }}>
          Pass your WA learner test in your language.
        </Text>
        <Text selectable style={{ color: "#D4E3EF", fontSize: 17, lineHeight: 26 }}>
          Practice official-style questions offline, switch language anytime, and sync progress when
          you sign in.
        </Text>
        <View style={{ flexDirection: "row", gap: spacing.sm, flexWrap: "wrap" }}>
          <View style={{ flexDirection: "row", gap: spacing.xs, alignItems: "center" }}>
            <WifiOff color={colors.green} size={18} />
            <Text style={{ color: "#fff", fontWeight: "800" }}>{copy.offlineReady}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: spacing.xs, alignItems: "center" }}>
            <Languages color={colors.green} size={18} />
            <Text style={{ color: "#fff", fontWeight: "800" }}>EN / PT / ES</Text>
          </View>
        </View>
        <Link href="/practice" asChild>
          <PrimaryButton>{copy.startPractice}</PrimaryButton>
        </Link>
      </Card>

      <Card>
        <Text style={{ color: c.ink, fontWeight: "900", fontSize: 18 }}>{copy.state}</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
          {AU_STATE_OPTIONS.map((option) => (
            <PillButton
              key={option.code}
              active={state === option.code}
              disabled={option.code !== "WA"}
              onPress={() => setStateCode(option.code)}
            >
              {option.code}
            </PillButton>
          ))}
        </View>
        <Text style={{ color: c.muted }}>
          WA is available now. {available.filter((item) => item !== "WA").join(", ")} are prepared
          for future content.
        </Text>
      </Card>

      <Card>
        <Text style={{ color: c.ink, fontWeight: "900", fontSize: 18 }}>{copy.language}</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
          {LANG_OPTIONS.map((option) => (
            <PillButton key={option.code} active={lang === option.code} onPress={() => setLang(option.code)}>
              {option.short}
            </PillButton>
          ))}
        </View>
      </Card>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md }}>
        <Card style={{ flex: 1, minWidth: 150 }}>
          <Stat label="Questions" value={String(QUESTIONS.length)} />
        </Card>
        <Card style={{ flex: 1, minWidth: 150 }}>
          <Stat label="Topics" value={String(CATEGORIES.length)} />
        </Card>
      </View>

      <View style={{ flexDirection: "row", gap: spacing.md }}>
        <Link href="/learn" asChild>
          <PillButton>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <BookOpen size={18} color={c.ink} />
              <Text style={{ color: c.ink, fontWeight: "900" }}>{copy.learn}</Text>
            </View>
          </PillButton>
        </Link>
        <Link href="/mock-test" asChild>
          <PillButton>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <ClipboardCheck size={18} color={c.ink} />
              <Text style={{ color: c.ink, fontWeight: "900" }}>{copy.mock}</Text>
            </View>
          </PillButton>
        </Link>
      </View>
    </Screen>
  );
}

