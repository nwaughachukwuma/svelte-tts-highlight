import { writable } from "svelte/store";
import type { SpeechState } from "./utils";

const createSpeechStore = () => {
  const initialState: SpeechState = {
    isPlaying: false,
    currentWordIndex: -1,
    currentParagraphIndex: -1,
  };

  const { subscribe, set, update } = writable(initialState);

  return {
    subscribe,
    startPlaying: () => update((state) => ({ ...state, isPlaying: true })),
    reset: () => set(initialState),
    updateIndices: (wordIndex: number, paragraphIndex: number) =>
      update((state) => ({
        ...state,
        currentWordIndex: wordIndex,
        currentParagraphIndex: paragraphIndex,
      })),
  };
};

export const speechStore = createSpeechStore();
