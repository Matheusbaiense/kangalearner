import { describe, it, expect } from "vitest";
import {
  applyXp,
  levelFromXp,
  xpToNextLevel,
  normaliseForToday,
  EMPTY_PROGRESS,
  XP_PER_CORRECT,
  type GameProgress
} from "./progress";

describe("applyXp", () => {
  it("starts a streak at 1 on the first ever XP", () => {
    // Arrange / Act
    const next = applyXp(EMPTY_PROGRESS, XP_PER_CORRECT, "2026-06-01");

    // Assert
    expect(next.totalXp).toBe(XP_PER_CORRECT);
    expect(next.streakDays).toBe(1);
    expect(next.lastActivityDate).toBe("2026-06-01");
    expect(next.todayXp).toBe(XP_PER_CORRECT);
  });

  it("accumulates todayXp and keeps the streak on the same day", () => {
    const day1 = applyXp(EMPTY_PROGRESS, 10, "2026-06-01");
    const same = applyXp(day1, 10, "2026-06-01");

    expect(same.todayXp).toBe(20);
    expect(same.totalXp).toBe(20);
    expect(same.streakDays).toBe(1);
  });

  it("increments the streak and resets todayXp on the next day", () => {
    const day1 = applyXp(EMPTY_PROGRESS, 30, "2026-06-01");
    const day2 = applyXp(day1, 10, "2026-06-02");

    expect(day2.streakDays).toBe(2);
    expect(day2.todayXp).toBe(10);
    expect(day2.totalXp).toBe(40);
  });

  it("resets the streak to 1 after a gap of more than one day", () => {
    const day1 = applyXp(EMPTY_PROGRESS, 30, "2026-06-01");
    const day4 = applyXp(day1, 10, "2026-06-04");

    expect(day4.streakDays).toBe(1);
    expect(day4.todayXp).toBe(10);
    expect(day4.totalXp).toBe(40);
  });

  it("ignores non-positive XP", () => {
    const start: GameProgress = { ...EMPTY_PROGRESS, totalXp: 50, streakDays: 3 };
    expect(applyXp(start, 0, "2026-06-02")).toBe(start);
    expect(applyXp(start, -5, "2026-06-02")).toBe(start);
  });
});

describe("levelFromXp", () => {
  it("is level 1 at 0 XP and climbs every 500 XP", () => {
    expect(levelFromXp(0).level).toBe(1);
    expect(levelFromXp(499).level).toBe(1);
    expect(levelFromXp(500).level).toBe(2);
    expect(levelFromXp(1000).level).toBe(3);
  });

  it("caps at the highest defined level", () => {
    expect(levelFromXp(999_999).level).toBe(5);
    expect(levelFromXp(999_999).title).toBe("Aussie Road Master");
  });
});

describe("xpToNextLevel", () => {
  it("reports the XP remaining to the next threshold", () => {
    expect(xpToNextLevel(0)).toBe(500);
    expect(xpToNextLevel(450)).toBe(50);
  });

  it("is 0 at max level", () => {
    expect(xpToNextLevel(5000)).toBe(0);
  });
});

describe("normaliseForToday", () => {
  it("zeroes todayXp when the stored day is not today", () => {
    const stored: GameProgress = {
      totalXp: 80,
      streakDays: 2,
      lastActivityDate: "2026-06-01",
      todayXp: 30,
      todayDate: "2026-06-01"
    };
    const now = normaliseForToday(stored, "2026-06-02");
    expect(now.todayXp).toBe(0);
    expect(now.totalXp).toBe(80);
    expect(now.streakDays).toBe(2);
  });

  it("leaves todayXp intact on the same day", () => {
    const stored: GameProgress = {
      totalXp: 80,
      streakDays: 2,
      lastActivityDate: "2026-06-02",
      todayXp: 30,
      todayDate: "2026-06-02"
    };
    expect(normaliseForToday(stored, "2026-06-02").todayXp).toBe(30);
  });
});
