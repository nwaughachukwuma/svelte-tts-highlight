<script context="module">
  const speechText =
    "Welcome to our speech highlighting demo. This is a test of synchronized text and speech.\nLorem ipsum dolor simet and Alice in the wonderland.\nElon is a living legend and I'll meet him someday soon.";
</script>

<script lang="ts">
  import { useSpeechHighlight } from "./useSpeechHighlight";

  const { useHandler, speechStore } = useSpeechHighlight({
    speechLang: "en-US",
    speechRate: 1,
    speechPitch: 1,
  });

  $: ({ paragraphsItems, toggleSpeech } = useHandler(speechText));
  $: ({ isPlaying, currentWordIndex, currentParagraphIndex } = $speechStore);
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
    {#each paragraphsItems as { words, prevWordsOffset }, i (i)}
      <div
        class="text-container"
        class:highlighted-paragraph={i === currentParagraphIndex}
        aria-current={i === currentParagraphIndex}
      >
        {#each words as word, j (j)}
          <span
            class:highlighted={j + prevWordsOffset === currentWordIndex}
            aria-current={j + prevWordsOffset === currentWordIndex}
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
    background-color: rgba(255, 0, 0, 0.75);
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
    outline: none;
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
