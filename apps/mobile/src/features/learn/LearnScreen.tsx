import { Link } from "expo-router";
import { Fragment } from "react";
import { Text, View } from "react-native";
import { categoriesForPool, questionsForState, categoryLabel } from "../../lib/questions";
import { Card, PillButton, Screen, useThemeColors } from "../../ui/kit";
import { spacing } from "../../theme";
import { iconForCategory } from "../../ui/category-icon";
import { AdSlot } from "../ads";
import { usePreferences } from "../preferences/PreferencesContext";

export function LearnScreen() {
  const c = useThemeColors();
  const { state, uiLang, copy } = usePreferences();
  const questions = questionsForState(state);

  return (
    <Screen title={copy.learn} subtitle={copy.learnSubtitle}>
      {categoriesForPool(questions).map((category, index) => {
        const Icon = iconForCategory(category.key);
        const count = questions.filter((q) => q.cat === category.key).length;
        return (
          <Fragment key={category.key}>
            <Card>
              <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
                <View
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 18,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#EAF7F1"
                  }}
                >
                  <Icon color={c.teal} size={26} />
                </View>
                <View style={{ flex: 1, gap: 4 }}>
                  <Text selectable style={{ color: c.ink, fontWeight: "900", fontSize: 20 }}>
                    {categoryLabel(category.key, uiLang)}
                  </Text>
                  <Text selectable style={{ color: c.muted, lineHeight: 22 }}>
                    {copy.learnTopicCount.replace("{count}", String(count))}
                  </Text>
                </View>
              </View>
              <Link href={{ pathname: "/practice", params: { cat: category.key } }} asChild>
                <PillButton>{copy.startPractice}</PillButton>
              </Link>
            </Card>
            {index === 1 ? <AdSlot slotId="learn_inline" /> : null}
          </Fragment>
        );
      })}
    </Screen>
  );
}
