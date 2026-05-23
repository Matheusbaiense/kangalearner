import { describe, expect, it } from "vitest";
import { validateQuestionsDataset } from "./questionsSchema";

describe("validateQuestionsDataset", () => {
  it("rejects non-object dataset", () => {
    expect(validateQuestionsDataset(null)).toEqual([{ msg: "dataset is not an object" }]);
  });

  it("rejects missing arrays", () => {
    expect(validateQuestionsDataset({})).toEqual([
      { msg: "missing QUESTIONS or CATEGORIES arrays" }
    ]);
  });

  it("accepts a minimal valid dataset", () => {
    const dataset = {
      CATEGORIES: [
        {
          key: "signs",
          label: { en: "Signs", pt: "Sinais", es: "Señales" }
        }
      ],
      QUESTIONS: [
        {
          id: "q-1",
          cat: "signs",
          q: { en: "Q?", pt: "P?", es: "E?" },
          exp: { en: "Because.", pt: "Porque.", es: "Porque." },
          opts: [
            {
              l: "A",
              t: { en: "No", pt: "Não", es: "No" },
              ok: false
            },
            {
              l: "B",
              t: { en: "Yes", pt: "Sim", es: "Sí" },
              ok: true
            }
          ],
          states: ["WA"]
        }
      ]
    };
    expect(validateQuestionsDataset(dataset)).toEqual([]);
  });

  it("flags unsafe HTML in explanations", () => {
    const dataset = {
      CATEGORIES: [
        {
          key: "signs",
          label: { en: "Signs", pt: "Sinais", es: "Señales" }
        }
      ],
      QUESTIONS: [
        {
          id: "bad-html",
          cat: "signs",
          q: { en: "Q?", pt: "P?", es: "E?" },
          exp: {
            en: "Safe",
            pt: '<script>alert("x")</script>',
            es: "Safe"
          },
          opts: [{ l: "A", t: { en: "A", pt: "A", es: "A" }, ok: true }],
          states: ["WA"]
        }
      ]
    };
    const issues = validateQuestionsDataset(dataset);
    expect(issues.some((i) => i.msg.includes("unsafe html"))).toBe(true);
  });
});
