<script lang="ts">
  import { onMount } from "svelte";
  import { getWordOffsets, getParagraphsItems, findWordIndex } from "./utils";
  import { speechStore } from "./speechStore.svelte";

  export let speechRate = 1;
  export let speechPitch = 1;
  export let speechLang = "en-US";
  export let text: string =
    "Welcome to our speech highlighting demo. This is a test of synchronized text and speech.\nLorem ipsum dolor simet and Alice in the wonderland.\nElon is a living legend and I'll meet him someday soon.";

  let speechSynthesis: SpeechSynthesis | undefined;
  let utterance: SpeechSynthesisUtterance;

  $: ({ isPlaying, currentWordIndex, currentParagraphIndex } = $speechStore);
  $: wordsOffsets = getWordOffsets(text);
  $: paragraphsWords = getParagraphsItems(text);

  function stopSpeech(speechSynthesis: SpeechSynthesis) {
    speechSynthesis.cancel();
    speechStore.reset();
  }

  function startSpeech(speechSynthesis: SpeechSynthesis) {
    utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
    utterance.pitch = speechPitch;
    utterance.lang = speechLang;

    // Updated onboundary handler to accurately compute the word index.
    utterance.onboundary = (evt) => {
      if (evt.name !== "word") return;

      const wIndex = findWordIndex(wordsOffsets, evt.charIndex);
      const pIndex = paragraphsWords.findIndex((p) => wIndex < p.pOffset);
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
    return isPlaying
      ? stopSpeech(speechSynthesis)
      : startSpeech(speechSynthesis);
  }

  onMount(() => {
    speechSynthesis = window.speechSynthesis;

    return () => {
      if (speechSynthesis && (utterance || isPlaying)) {
        speechSynthesis.cancel();
      }
    };
  });
</script>

<div class="speech-container">
  <button
    class="speech-button"
    on:click={toggleSpeech}
    aria-label={isPlaying ? "Stop speech synthesis" : "Start speech synthesis"}
  >
    {isPlaying ? "Stop" : "Start"} Speech
  </button>

  <div class="paragraph-container">
    {#each paragraphsWords as { words, lbOffset }, i (i)}
      <div
        class="text-container"
        class:highlighted-paragraph={i === currentParagraphIndex}
        aria-current={i === currentParagraphIndex}
      >
        {#each words as word, j (j)}
          <span
            class:highlighted={j + lbOffset === currentWordIndex}
            aria-current={j + lbOffset === currentWordIndex}
          >
            {word}
          </span>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .speech-container {
    max-width: 600px;
    margin: 2rem auto;
    padding: 1rem;
  }

  .paragraph-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .text-container {
    margin-top: 1rem;
    line-height: 1.6;
    display: flex;
    flex-wrap: wrap;
    transition: background-color 0.4s ease-in;
  }

  span {
    margin-right: 0.3em;
    padding: 0.1em 0.2em;
    border-radius: 3px;
    transition: background-color 0.2s ease;
  }

  .highlighted {
    background-color: red;
    color: white;
  }

  .highlighted-paragraph {
    background-color: rgba(128, 128, 128, 0.25);
    border-radius: 4px;
  }

  .speech-button {
    background-color: #ff3e00;
    color: white;
    border: none;
    padding: 0.5em 1em;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
    transition:
      background-color 0.2s ease,
      transform 0.1s ease;
  }

  .speech-button:hover {
    background-color: #ff5722;
  }

  .speech-button:active {
    transform: scale(0.98);
  }
</style>
