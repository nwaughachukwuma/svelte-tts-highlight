<script lang="ts" context="module">
  interface ParagraphItem {
    words: string[];
    pOffset: number;
    lbOffset: number;
    text: string;
  }

  function getWordOffsets(text: string) {
    const regex = /\S+/g;
    const offsets: number[] = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text))) {
      offsets.push(match.index);
    }

    return offsets;
  }

  function getParagraphsItems(text: string): ParagraphItem[] {
    let pOffset = 0;
    let lbOffset = 0;
    const paragraphs = text.split("\n");

    return paragraphs.map((text) => {
      const words = text.match(/\S+/g) || [];
      pOffset += words.length;
      const payload = { words, pOffset, lbOffset, text };

      lbOffset = pOffset;
      return payload;
    });
  }
</script>

<script lang="ts">
  import { onMount } from "svelte";

  export let text: string =
    "Welcome to our speech highlighting demo. This is a test of synchronized text and speech.\nLorem ipsum dolor simet and Alice in the wonderland.\nElon is a living legend and I'll meet him someday soon.";

  let currentWordIndex = -1;
  let currentParagraphIndex = -1;

  let isPlaying = false;
  let speechSynthesis: SpeechSynthesis | undefined;
  let utterance: SpeechSynthesisUtterance;

  $: wordsOffsets = getWordOffsets(text);
  $: paragraphsWords = getParagraphsItems(text);

  function startSpeech() {
    if (!speechSynthesis) {
      throw new Error("Speech synthesis is not supported in this browser.");
    }

    if (isPlaying) {
      speechSynthesis.cancel();
      isPlaying = false;
      currentWordIndex = -1;
      return;
    }

    utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.lang = "en-US";

    // Updated onboundary handler to accurately compute the word index.
    utterance.onboundary = (event) => {
      if (event.name === "word") {
        // Loop backward through the word offsets to find the appropriate word index.
        for (let i = wordsOffsets.length - 1; i >= 0; i--) {
          if (event.charIndex >= wordsOffsets[i]) {
            currentWordIndex = i;
            break;
          }
        }

        currentParagraphIndex = paragraphsWords.findIndex(
          (p) => currentWordIndex < p.pOffset
        );
      }
    };

    utterance.onstart = () => {
      isPlaying = true;
    };

    utterance.onend = () => {
      isPlaying = false;
      currentWordIndex = -1;
    };

    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      isPlaying = false;
      currentWordIndex = -1;
    };

    speechSynthesis.speak(utterance);
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
    on:click={startSpeech}
    aria-label={isPlaying ? "Stop speech" : "Start speech"}
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
