import { onMount } from "svelte";
import { get } from "svelte/store";
import { speechStore } from "./speechStore.svelte";
import { findWordIndex, getParagraphsItems, getWordOffsets } from "./utils";

export interface ContextConfig {
  speechRate: number;
  speechPitch: number;
  speechLang: string;
}

export function useSpeechHighlight(config: ContextConfig) {
  let speechSynthesis: SpeechSynthesis | null = null;

  function stopSpeech(speechSynthesis: SpeechSynthesis) {
    speechSynthesis.cancel();
    speechStore.reset();
  }

  function useHandler(speechText: string) {
    const wordsOffsets = getWordOffsets(speechText);
    const paragraphsItems = getParagraphsItems(speechText);

    function startSpeech(speechSynthesis: SpeechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.rate = config.speechRate;
      utterance.pitch = config.speechPitch;
      utterance.lang = config.speechLang;

      // Updated onboundary handler to accurately compute the word index.
      utterance.onboundary = (evt) => {
        if (evt.name !== "word") return;

        const wIndex = findWordIndex(wordsOffsets, evt.charIndex);
        const pIndex = paragraphsItems.findIndex((p) => wIndex < p.wordsOffset);
        speechStore.updateIndices(wIndex, pIndex);
      };

      utterance.onstart = () => speechStore.startPlaying();
      utterance.onend = () => speechStore.reset();
      utterance.onerror = (evt) => {
        console.error("Speech synthesis error:", evt);
        speechStore.reset();
      };

      speechSynthesis.speak(utterance);
    }

    function toggleSpeech() {
      if (!speechSynthesis) {
        throw new Error("Speech synthesis is not supported in this browser.");
      }
      return get(speechStore).isPlaying
        ? stopSpeech(speechSynthesis)
        : startSpeech(speechSynthesis);
    }

    return { paragraphsItems, toggleSpeech };
  }

  onMount(() => {
    speechSynthesis = window.speechSynthesis;
    return () => speechSynthesis && stopSpeech(speechSynthesis);
  });

  return {
    useHandler,
    speechStore,
  };
}
