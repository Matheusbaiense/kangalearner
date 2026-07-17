import * as Crypto from "expo-crypto";
import * as Haptics from "expo-haptics";
import { useEffect, useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import {
  QUESTIONS,
  WA_PASS_MIN_CORRECT,
  WA_TOTAL_QUESTIONS,
  buildMockQuestionIds,
  correctLetter,
  scoreAnswers,
  tx,
  type MockSessionRecord
} from "../../lib/questions";
import { enqueueSync, loadMockSessions, saveMockSessions } from "../../lib/local-store";
import { isBilingual } from "../../lib/i18n";
import {
  Card,
  PillButton,
  PrimaryButton,
  ProgressBar,
  Screen,
  Stat,
  useThemeColors
} from "../../ui/kit";
import { colors, spacing } from "../../theme";
import { AdSlot } from "../ads";
import { usePreferences } from "../preferences/PreferencesContext";

const EXAM_SECONDS = 45 * 60;

type MockMode = "practice" | "exam";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function MockTestScreen() {
  const c = useThemeColors();
  const { state, lang, uiLang, copy } = usePreferences();
  const [mode, setMode] = useState<MockMode>("practice");
  const [qids, setQids] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [idx, setIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(EXAM_SECONDS);
  const [history, setHistory] = useState<MockSessionRecord[]>([]);

  useEffect(() => {
    void loadMockSessions().then(setHistory);
  }, []);

  useEffect(() => {
    if (!qids.length || mode !== "exam") return;
    const timer = setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          clearInterval(timer);
          void finishSession();
          return 0;
        }
        return current - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [qids.length, mode]);

  const activeQuestion = useMemo(() => {
    if (!qids.length) return null;
    return QUESTIONS.find((q) => q.id === qids[idx]) ?? null;
  }, [qids, idx]);

  const score = scoreAnswers(qids, answers);
  const complete = qids.length > 0 && Object.keys(answers).length >= qids.length;
  const passed = score >= WA_PASS_MIN_CORRECT;
  const progress = qids.length ? Math.round((Object.keys(answers).length / qids.length) * 100) : 0;

  function startSession(nextMode = mode) {
    setMode(nextMode);
    setQids(buildMockQuestionIds(state, WA_TOTAL_QUESTIONS));
    setAnswers({});
    setIdx(0);
    setTimeLeft(EXAM_SECONDS);
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }

  async function finishSession(finalAnswers = answers) {
    if (!qids.length) return;
    const totalScore = scoreAnswers(qids, finalAnswers);
    const session: MockSessionRecord = {
      id:
        typeof Crypto.randomUUID === "function"
          ? Crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      state,
      mode,
      qids,
      answers: finalAnswers,
      score: totalScore,
      total: qids.length,
      completedAt: new Date().toISOString(),
      synced: false
    };
    const nextHistory = [session, ...history].slice(0, 20);
    setHistory(nextHistory);
    await saveMockSessions(nextHistory);
    await enqueueSync({ type: "mock_session", id: session.id, payload: session });
    void Haptics.notificationAsync(
      totalScore >= WA_PASS_MIN_CORRECT
        ? Haptics.NotificationFeedbackType.Success
        : Haptics.NotificationFeedbackType.Warning
    );
  }

  function choose(letter: string) {
    if (!activeQuestion || answers[activeQuestion.id]) return;
    const next = { ...answers, [activeQuestion.id]: letter };
    setAnswers(next);
    const isLast = idx + 1 >= qids.length;
    if (isLast) {
      setTimeout(() => void finishSession(next), 300);
    }
  }

  function nextQuestion() {
    if (idx + 1 < qids.length) setIdx((current) => current + 1);
  }

  if (!qids.length) {
    return (
      <Screen
        title={copy.mock}
        subtitle={`${state} - ${WA_TOTAL_QUESTIONS} questions - pass mark ${WA_PASS_MIN_CORRECT}/${WA_TOTAL_QUESTIONS}`}
      >
        <Card>
          <Text style={{ color: c.ink, fontWeight: "900", fontSize: 20 }}>{copy.mockMode}</Text>
          <View style={{ flexDirection: "row", gap: spacing.sm }}>
            <PillButton active={mode === "practice"} onPress={() => setMode("practice")}>
              {copy.practiceMode}
            </PillButton>
            <PillButton active={mode === "exam"} onPress={() => setMode("exam")}>
              {copy.examMode}
            </PillButton>
          </View>
          <Text selectable style={{ color: c.muted, lineHeight: 23 }}>
            Practice mode reveals answers as you go. Exam mode keeps feedback until the result.
          </Text>
          <PrimaryButton onPress={() => startSession()}>{copy.startMock}</PrimaryButton>
        </Card>
        {history.length ? (
          <Card>
            <Text style={{ color: c.ink, fontWeight: "900", fontSize: 18 }}>Recent results</Text>
            {history.slice(0, 3).map((item) => (
              <View key={item.id} style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ color: c.muted }}>
                  {new Date(item.completedAt).toLocaleDateString()}
                </Text>
                <Text style={{ color: c.ink, fontWeight: "900" }}>
                  {item.score}/{item.total}
                </Text>
              </View>
            ))}
          </Card>
        ) : null}
      </Screen>
    );
  }

  if (complete) {
    return (
      <Screen title={copy.result} subtitle={passed ? copy.pass : copy.fail}>
        <Card>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.md }}>
            <Stat label="Score" value={`${score}/${qids.length}`} />
            <Stat label="Pass mark" value={`${WA_PASS_MIN_CORRECT}/${WA_TOTAL_QUESTIONS}`} />
          </View>
          <ProgressBar value={Math.round((score / qids.length) * 100)} />
          <PrimaryButton onPress={() => startSession()}>{copy.startMock}</PrimaryButton>
          <PillButton onPress={() => setQids([])}>{copy.finish}</PillButton>
        </Card>
        <AdSlot slotId="mock_result" />
      </Screen>
    );
  }

  if (!activeQuestion) return null;

  const selected = answers[activeQuestion.id];
  const correct = correctLetter(activeQuestion);
  const reveal = mode === "practice" && selected;
  const bilingual = isBilingual(lang);

  return (
    <Screen
      title={copy.mock}
      subtitle={`${idx + 1}/${qids.length} - ${mode === "exam" ? `${copy.timeRemaining}: ${formatTime(timeLeft)}` : copy.practiceMode}`}
    >
      <ProgressBar value={progress} />
      <Card>
        <Text selectable style={{ color: c.ink, fontWeight: "900", fontSize: 22, lineHeight: 31 }}>
          {tx(activeQuestion.q, uiLang)}
        </Text>
        {bilingual && activeQuestion.q.en !== tx(activeQuestion.q, uiLang) ? (
          <Text selectable style={{ color: c.muted, fontStyle: "italic" }}>
            {activeQuestion.q.en}
          </Text>
        ) : null}
        <View style={{ gap: spacing.sm }}>
          {activeQuestion.opts.map((option) => {
            const picked = selected === option.l;
            const isCorrect = correct === option.l;
            return (
              <Pressable
                key={option.l}
                accessibilityRole="button"
                disabled={Boolean(selected)}
                onPress={() => choose(option.l)}
                style={({ pressed }) => ({
                  minHeight: 58,
                  padding: spacing.md,
                  borderRadius: 16,
                  borderWidth: 1,
                  borderColor:
                    reveal && isCorrect
                      ? colors.success
                      : reveal && picked
                        ? colors.danger
                        : c.border,
                  backgroundColor:
                    reveal && isCorrect ? "#EAF7F1" : reveal && picked ? "#FDECEC" : c.card,
                  opacity: pressed ? 0.75 : 1
                })}
              >
                <Text style={{ color: c.ink, fontWeight: "800", fontSize: 16 }}>
                  {option.l}. {tx(option.t, uiLang)}
                </Text>
              </Pressable>
            );
          })}
        </View>
        {reveal ? (
          <Text selectable style={{ color: c.muted, lineHeight: 23 }}>
            {tx(activeQuestion.exp, uiLang).replace(/<[^>]*>/g, "")}
          </Text>
        ) : null}
        <PrimaryButton disabled={!selected} onPress={nextQuestion}>
          {idx + 1 >= qids.length ? copy.finish : copy.next}
        </PrimaryButton>
      </Card>
    </Screen>
  );
}
