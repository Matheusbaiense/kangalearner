import type { Question } from "./questions";
import type { Lang } from "./i18n";

export type TutorContext = {
  question: Question;
  chosen?: string;
  lang: Lang;
};

export type TutorResponse = {
  title: string;
  body: string;
};

export interface TutorPlugin {
  id: string;
  enabled: boolean;
  explain(context: TutorContext): Promise<TutorResponse>;
}

export const disabledTutorPlugin: TutorPlugin = {
  id: "disabled-v1",
  enabled: false,
  async explain() {
    return {
      title: "AI tutor coming later",
      body: "The app keeps this extension point ready, but v1 does not call an AI model."
    };
  }
};

