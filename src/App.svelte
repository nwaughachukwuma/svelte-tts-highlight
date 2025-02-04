<script lang="ts">
  import SpeechHighlight from "./lib/TTSHighlighter.svelte";
</script>

<main>
  <h1>Speech Highlight Demo</h1>

  <div class="card">
    <SpeechHighlight />
  </div>

  <p class="info">
    Click the Start Speech button to begin the text-to-speech with synchronized
    highlighting
  </p>
</main>

<style>
  main {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-align: center;
    margin-bottom: 2rem;
  }

  .card {
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 2rem;
  }

  .info {
    text-align: center;
    color: #666;
    margin-top: 2rem;
  }

  @media (prefers-color-scheme: dark) {
    .card {
      background: #2a2a2a;
    }
  }
</style>
