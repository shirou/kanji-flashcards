import { atom } from "jotai";
import type { questionType } from "./questionData";

export const levelSetting = atom("漢字検定二級");
export const maxQuestionsSetting = atom(5);
export const intervalSecSetting = atom(8);
export const questionsSetting = atom({} as questionType);
export const answersSetting = atom([] as string[]);
export const qtypeSetting = atom("読み");
