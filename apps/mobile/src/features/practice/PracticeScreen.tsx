import { useLocalSearchParams } from "expo-router";
import * as Haptics from "expo-haptics";
import { Bookmark, CheckCircle2, Circle, RotateCcw, Star } from "lucide-react-native";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import {
  categoriesForPool,
  categoryLabel,
  correctLetter,
  questionsForState,
  tx,
  type AnswerRecord
} from "../../lib/questions";
import {
  enqueueSync,
  loadAnswers,
  loadSavedQuestions,
  saveAnswers,
  saveSavedQuestions
} from "../../lib/local-store";
import { isBilingual } from "../../lib/i18n";
import { Card, PillButton, ProgressBar, Screen, Stat, useThemeColors } from "../../ui/kit";
import { iconForCategory } from "../../ui/category-icon";
import { colors, spacing } from "../../theme";
import { AdSlot } from "../ads";
import { usePreferences } from "../preferences/PreferencesContext";

type Mode = "all" | "wrong" | "unanswered" | "saved";

export function PracticeScreen() {
  const params = useLocalSearchParams<{ cat?: string }>();
  const c = useThemeColors();
  const { state, lang, uiLang, copy } = usePreferences();
  const [mode, setMode] = useState<Mode>("all");
  const [category, setCategory] = useState(params.cat ?? "all");
  const [answers, setAnswers] = useState<Record<string, AnswerRecord>>({});
  const [saved, setSaved] = useState<Set<string>>(new Set());

  useEffect(() => {
    void loadAnswers().then(setAnswers);
    void loadSavedQuestions().then((ids) => setSaved(new Set(ids)));
  }, []);

  useEffect(() => {
    if (params.cat) setCategory(params.cat);
  }, [params.cat]);

  const allQuestions = useMemo(() => questionsForState(state), [state]);
  const stateCategories = useMemo(() => categoriesForPool(allQuestions), [allQuestions]);
  const filtered = useMemo(() => {
    let next = allQuestions;
    if (category !== "all") next = next.filter((q) => q.cat === category);
    if (mode === "wrong") next = next.filter((q) => answers[q.id] && !answers[q.id].correct);
    if (mode === "unanswered") next = next.filter((q) => !answers[q.id]);
    if (mode === "saved") next = next.filter((q) => saved.has(q.id));
    return next;
  }, [allQuestions, category, mode, answers, saved]);

  const correctCount = Object.values(answers).filter((a) => a.correct).length;
  const answeredCount = Object.keys(answers).length;
  const accuracy = answeredCount ? Math.round((correctCount / answeredCount) * 100) : 0;

  async function choose(questionId: string, letter: string) {
    if (answers[questionId]) return;
    const q = allQuestions.find((item) => item.id === questionId);
    if (!q) return;
    const correct = correctLetter(q) === letter;
    if (correct) void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    else void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    const record: AnswerRecord = {
      questionId,
      category: q.cat,
      chosen: letter,
      correct,
      state,
      answeredAt: new Date().toISOString(),
      source: "mobile",
      synced: false
    };
    const next = { ...answers, [questionId]: record };
    setAnswers(next);
    await saveAnswers(next);
    await enqueueSync({
      type: "attempt",
      id: `${questionId}:${record.answeredAt}`,
      payload: record
    });
  }

  async function toggleSaved(questionId: string) {
    const next = new Set(saved);
    const willSave = !next.has(questionId);
    if (willSave) next.add(questionId);
    else next.delete(questionId);
    setSaved(next);
    await saveSavedQuestions([...next]);
    await enqueueSync({
      type: "saved_question",
      id: `saved:${questionId}`,
      payload: { questionId, saved: willSave }
    });
  }

  function resetProgress() {
    Alert.alert(copy.reset, copy.resetPracticeBody, [
      { text: copy.cancel, style: "cancel" },
      {
        text: copy.reset,
        style: "destructive",
        onPress: () => {
          setAnswers({});
          void saveAnswers({});
        }
      }
    ]);
  }

  return (
    <Screen
      title={copy.practice}
      subtitle={`${allQuestions.length} ${copy.questionsLabel.toLowerCase()} - ${stateCategories.length} ${copy.topicsLabel.toLowerCase()} - ${state}`}
      action={
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={copy.reset}
          onPress={resetProgress}
          style={({ pressed }) => ({ minHeight: 44, minWidth: 44, opacity: pressed ? 0.65 : 1 })}
        >
          <RotateCcw color={c.muted} size={24} />
        </Pressable>
      }
    >
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md }}>
        <Card style={{ flex: 1, minWidth: 145 }}>
          <Stat label={copy.answered} value={String(answeredCount)} />
        </Card>
        <Card style={{ flex: 1, minWidth: 145 }}>
          <Stat label={copy.accuracy} value={`${accuracy}%`} />
        </Card>
      </View>

      <Card>
        <Text style={{ color: c.ink, fontWeight: "900", fontSize: 18 }}>{copy.studyMode}</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
          {[
            ["all", copy.all],
            ["wrong", copy.wrong],
            ["unanswered", copy.unanswered],
            ["saved", copy.saved]
          ].map(([key, label]) => (
            <PillButton key={key} active={mode === key} onPress={() => setMode(key as Mode)}>
              {label}
            </PillButton>
          ))}
        </View>
      </Card>

      <Card>
        <Text style={{ color: c.ink, fontWeight: "900", fontSize: 18 }}>{copy.allTopics}</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
          <PillButton active={category === "all"} onPress={() => setCategory("all")}>
            {copy.allTopics}
          </PillButton>
          {stateCategories.map((cat) => (
            <PillButton
              key={cat.key}
              active={category === cat.key}
              onPress={() => setCategory(cat.key)}
            >
              {categoryLabel(cat.key, uiLang)}
            </PillButton>
          ))}
        </View>
      </Card>

      {filtered.length === 0 ? (
        <Card>
          <Text style={{ color: c.ink, fontSize: 20, fontWeight: "900" }}>{copy.noQuestions}</Text>
        </Card>
      ) : (
        filtered.map((q, index) => {
          const answer = answers[q.id];
          const Icon = iconForCategory(q.cat);
          const bilingual = isBilingual(lang);
          return (
            <Fragment key={q.id}>
              <Card>
                <View style={{ flexDirection: "row", gap: spacing.sm, alignItems: "center" }}>
                  <Icon color={c.teal} size={22} />
                  <Text style={{ color: c.green, fontWeight: "900", flex: 1 }}>{q.id}</Text>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={saved.has(q.id) ? copy.unsaveQuestion : copy.saveQuestion}
                    onPress={() => void toggleSaved(q.id)}
                    style={{
                      minHeight: 44,
                      minWidth: 44,
                      alignItems: "flex-end",
                      justifyContent: "center"
                    }}
                  >
                    {saved.has(q.id) ? (
                      <Star color={colors.warning} fill={colors.warning} size={22} />
                    ) : (
                      <Bookmark color={c.muted} size={22} />
                    )}
                  </Pressable>
                </View>
                <Text
                  selectable
                  style={{ color: c.ink, fontWeight: "900", fontSize: 21, lineHeight: 30 }}
                >
                  {tx(q.q, uiLang)}
                </Text>
                {bilingual && q.q.en !== tx(q.q, uiLang) ? (
                  <Text selectable style={{ color: c.muted, fontStyle: "italic", lineHeight: 22 }}>
                    {q.q.en}
                  </Text>
                ) : null}
                <Text style={{ color: c.muted, fontWeight: "800" }}>
                  {categoryLabel(q.cat, uiLang)}
                </Text>
                <View style={{ gap: spacing.sm }}>
                  {q.opts.map((option) => {
                    const picked = answer?.chosen === option.l;
                    const correct = Boolean(option.ok);
                    const show = Boolean(answer);
                    const borderColor =
                      show && correct ? colors.success : show && picked ? colors.danger : c.border;
                    return (
                      <Pressable
                        key={option.l}
                        accessibilityRole="button"
                        disabled={show}
                        onPress={() => void choose(q.id, option.l)}
                        style={({ pressed }) => ({
                          minHeight: 56,
                          borderWidth: 1,
                          borderColor,
                          borderRadius: 16,
                          padding: spacing.md,
                          flexDirection: "row",
                          gap: spacing.md,
                          alignItems: "center",
                          backgroundColor:
                            show && correct ? "#EAF7F1" : show && picked ? "#FDECEC" : c.card,
                          opacity: pressed ? 0.75 : 1
                        })}
                      >
                        {show && correct ? (
                          <CheckCircle2 color={colors.success} size={24} />
                        ) : (
                          <Circle color={picked ? colors.danger : c.muted} size={24} />
                        )}
                        <Text style={{ color: c.ink, fontWeight: "800", flex: 1, fontSize: 16 }}>
                          {option.l}. {tx(option.t, uiLang)}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
                {answer ? (
                  <View style={{ gap: spacing.sm }}>
                    <Text
                      style={{
                        color: answer.correct ? colors.success : colors.danger,
                        fontWeight: "900"
                      }}
                    >
                      {answer.correct ? copy.correct : copy.notQuite}
                    </Text>
                    <Text selectable style={{ color: c.muted, lineHeight: 23 }}>
                      {tx(q.exp, uiLang).replace(/<[^>]*>/g, "")}
                    </Text>
                  </View>
                ) : null}
              </Card>
              {index === 4 ? <AdSlot slotId="practice_inline" /> : null}
            </Fragment>
          );
        })
      )}
      <ProgressBar value={accuracy} />
    </Screen>
  );
}
