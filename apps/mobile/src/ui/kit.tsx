import type { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  useColorScheme,
  View,
  type TextInputProps,
  type ViewStyle
} from "react-native";
import { darkColors, colors, radius, spacing, type ThemeColors } from "../theme";

export function useThemeColors(): ThemeColors {
  return useColorScheme() === "dark" ? darkColors : colors;
}

export function Screen({
  children,
  title,
  subtitle,
  action
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  const c = useThemeColors();
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1, backgroundColor: c.paper }}
      contentContainerStyle={{ padding: spacing.md, gap: spacing.md, paddingBottom: 120 }}
    >
      {(title || subtitle || action) && (
        <View style={{ gap: spacing.xs }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", gap: spacing.md }}>
            {title ? (
              <Text selectable style={{ color: c.ink, fontSize: 34, fontWeight: "900", flex: 1 }}>
                {title}
              </Text>
            ) : (
              <View />
            )}
            {action}
          </View>
          {subtitle ? (
            <Text selectable style={{ color: c.muted, fontSize: 16, lineHeight: 24 }}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      )}
      {children}
    </ScrollView>
  );
}

export function Card({
  children,
  style,
  tone = "default"
}: {
  children: ReactNode;
  style?: ViewStyle;
  tone?: "default" | "brand" | "soft";
}) {
  const c = useThemeColors();
  const backgroundColor = tone === "brand" ? c.navy2 : tone === "soft" ? "#EAF7F1" : c.card;
  return (
    <View
      style={[
        {
          backgroundColor,
          borderColor: tone === "brand" ? "rgba(255,255,255,0.14)" : c.border,
          borderWidth: 1,
          borderRadius: radius.lg,
          padding: spacing.lg,
          gap: spacing.md,
          boxShadow: "0 8px 24px rgba(7, 26, 44, 0.08)"
        },
        style
      ]}
    >
      {children}
    </View>
  );
}

export function PillButton({
  children,
  active,
  disabled,
  onPress,
  variant = "light"
}: {
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  variant?: "light" | "brand";
}) {
  const c = useThemeColors();
  const isBrand = variant === "brand";
  const isPlainText = typeof children === "string" || typeof children === "number";
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => ({
        minHeight: 46,
        minWidth: 46,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: spacing.md,
        borderRadius: radius.pill,
        borderWidth: 1,
        borderColor: active ? c.green : isBrand ? "rgba(255,255,255,0.18)" : c.border,
        backgroundColor: active
          ? c.green
          : isBrand
            ? "rgba(255,255,255,0.08)"
            : disabled
              ? "rgba(100,117,138,0.08)"
              : c.card,
        opacity: disabled ? 0.48 : pressed ? 0.78 : 1
      })}
    >
      {isPlainText ? (
        <Text
          style={{
            color: active ? "#fff" : isBrand ? "#fff" : c.ink,
            fontWeight: "800",
            fontSize: 15
          }}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

export function PrimaryButton({
  children,
  disabled,
  loading,
  onPress
}: {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => ({
        minHeight: 56,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: radius.md,
        paddingHorizontal: spacing.lg,
        backgroundColor: colors.green,
        opacity: disabled ? 0.45 : pressed ? 0.78 : 1
      })}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={{ color: "#fff", fontWeight: "900", fontSize: 17 }}>{children}</Text>
      )}
    </Pressable>
  );
}

export function Field(props: TextInputProps & { label: string }) {
  const c = useThemeColors();
  const { label, style, ...rest } = props;
  return (
    <View style={{ gap: spacing.xs }}>
      <Text style={{ color: c.ink, fontWeight: "800", fontSize: 14 }}>{label}</Text>
      <TextInput
        {...rest}
        placeholderTextColor={c.muted}
        style={[
          {
            minHeight: 52,
            borderWidth: 1,
            borderColor: c.border,
            borderRadius: radius.md,
            color: c.ink,
            backgroundColor: c.card,
            paddingHorizontal: spacing.md,
            fontSize: 16
          },
          style
        ]}
      />
    </View>
  );
}

export function ProgressBar({ value }: { value: number }) {
  const c = useThemeColors();
  return (
    <View style={{ height: 10, backgroundColor: c.border, borderRadius: radius.pill }}>
      <View
        style={{
          height: 10,
          width: `${Math.max(0, Math.min(100, value))}%`,
          backgroundColor: c.green,
          borderRadius: radius.pill
        }}
      />
    </View>
  );
}

export function Stat({ label, value }: { label: string; value: string }) {
  const c = useThemeColors();
  return (
    <View style={{ flex: 1, minWidth: 130, gap: spacing.xs }}>
      <Text style={{ color: c.muted, fontSize: 13, fontWeight: "700" }}>{label}</Text>
      <Text selectable style={{ color: c.ink, fontSize: 26, fontWeight: "900" }}>
        {value}
      </Text>
    </View>
  );
}
