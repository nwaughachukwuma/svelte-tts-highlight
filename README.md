# svelte-tts-highlighter

A lightweight, modular Svelte component for text-to-speech with synchronized word and paragraph highlighting. Perfect for creating accessible content with visual feedback.

[![NPM Version](https://img.shields.io/npm/v/svelte-tts-highlighter.svg)](https://www.npmjs.com/package/svelte-tts-highlighter)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎯 Real-time word and paragraph highlighting
- 📦 Modular architecture for flexible integration
- ⚡ Efficient word searching with binary search
- 🎛️ Configurable speech parameters
- 💡 Simple and intuitive API
- 📱 Responsive design

## Installation

```bash
npm install svelte-tts-highlighter
# or
pnpm add svelte-tts-highlighter
# or
yarn add svelte-tts-highlighter
```

## Usage

The library is structured in a modular way, allowing you to use it according to your needs:

### Basic Usage

```svelte
<script lang="ts">
  import { useSpeechHighlight } from 'svelte-tts-highlighter';

  const text = "Welcome to our demo. This is a test.";
  const { useHandler, speechStore } = useSpeechHighlight({
    speechRate: 1,
    speechPitch: 1,
    speechLang: 'en-US'
  });

  const { paragraphsItems, toggleSpeech } = useHandler(text);

  $: ({ isPlaying, currentWordIndex, currentParagraphIndex } = $speechStore);
</script>

<button on:click={toggleSpeech}>
  {isPlaying ? 'Stop' : 'Start'} Speech
</button>

<div class="paragraphs">
  {#each paragraphsItems as { words, prevWordsOffset }, i}
    <p class:active={i === currentParagraphIndex}>
      {#each words as word, j}
        <span class:highlight={j + prevWordsOffset === currentWordIndex}>
          {word}
        </span>
      {/each}
    </p>
  {/each}
</div>
```

### Module Structure

The library consists of three main modules:

1. **speechStore.ts** - Manages the speech state

```typescript
import { speechStore } from "svelte-tts-highlighter";

// Access store values
$: ({ isPlaying, currentWordIndex, currentParagraphIndex } = $speechStore);
```

2. **utils.ts** - Contains utility functions

```typescript
import { type ParagraphItem, type SpeechState } from "svelte-tts-highlighter";
```

3. **useSpeechHighlight.ts** - Main hook for speech functionality

```typescript
import { useSpeechHighlight } from "svelte-tts-highlighter";
```

## API Reference

### useSpeechHighlight

```typescript
const { useHandler, speechStore } = useSpeechHighlight({
  speechRate?: number;  // default: 1
  speechPitch?: number; // default: 1
  speechLang?: string; // default: 'en-US'
});
```

### useHandler

```typescript
const { paragraphsItems, toggleSpeech } = useHandler(text: string);
```

### Store Interface

```typescript
interface SpeechState {
  isPlaying: boolean;
  currentWordIndex: number;
  currentParagraphIndex: number;
}
```

### ParagraphItem Interface

```typescript
interface ParagraphItem {
  words: string[];
  wordsOffset: number;
  prevWordsOffset: number;
  text: string;
}
```

## Styling

Add your own CSS to style the highlighted words and paragraphs:

```css
.highlight {
  background-color: #3d5413;
  color: white;
}

.active {
  background-color: rgba(128, 128, 128, 0.2);
}

span {
  margin-right: 0.3em;
  padding: 0.1em 0.2em;
  border-radius: 3px;
  transition: background-color 0.2s ease;
}
```

## Browser Support

This component uses the Web Speech API. Check [browser compatibility](https://caniuse.com/?search=Web%20Speech%20API) for support details.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
