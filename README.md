# svelte-tts-highlight

A Svelte component that provides synchronized text-to-speech with real-time word and paragraph highlighting. Perfect for accessibility enhancements, language learning applications, or any interface requiring speech synthesis with visual feedback.

[![NPM Version](https://img.shields.io/npm/v/svelte-tts-highlight.svg)](https://www.npmjs.com/package/svelte-tts-highlight)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎯 Real-time word highlighting synchronized with speech
- 📝 Paragraph-level highlighting for better context
- ⚡ Optimized performance with binary search algorithm
- 🎛️ Configurable speech parameters (rate, pitch, language)
- ♿ Accessibility-first design with ARIA attributes
- 📱 Responsive and mobile-friendly
- 🎨 Customizable styling
- 🏷️ Written in TypeScript for better type safety

## Installation

```bash
npm install svelte-tts-highlight
# or
pnpm add svelte-tts-highlight
# or
yarn add svelte-tts-highlight
```

## Basic Usage

```svelte
<script lang="ts">
  import SpeechHighlighter from 'svelte-tts-highlight';

  const text = `Welcome to our speech highlighting demo.
This is a test of synchronized text and speech.
Try clicking the button below to start!`;
</script>

<SpeechHighlighter {text} />
```

## Advanced Usage

```svelte
<script lang="ts">
  import SpeechHighlighter from 'svelte-tts-highlight';

  const text = `Custom configuration example.`;
</script>

<SpeechHighlighter
  text={text}
  speechRate={1.2}
  speechPitch={1.1}
  speechLang="en-US"
/>
```

## Props

| Prop          | Type     | Default   | Description                                 |
| ------------- | -------- | --------- | ------------------------------------------- |
| `text`        | `string` | required  | The text content to be read and highlighted |
| `speechRate`  | `number` | `1`       | Speech rate (0.1 to 10)                     |
| `speechPitch` | `number` | `1`       | Speech pitch (0 to 2)                       |
| `speechLang`  | `string` | `"en-US"` | Speech language code                        |

## Styling

The component comes with default styling but can be customized using CSS custom properties:

```css
/* Override default styles */
:global(.speech-container) {
  --highlight-color: #3d5413;
  --paragraph-highlight-color: rgba(128, 128, 128, 0.2);
  --button-color: #ff3e00;
  --button-hover-color: #ff5722;
}
```

## Project Structure

```
src/
├── lib/
│   ├── SpeechHighlight.svelte   # Main component
│   ├── speechStore.ts           # State management
│   └── utils.ts                 # Utility functions & TS interfaces
├── App.svelte                   # Root component
└── main.ts                      # Application entry point
```

## Browser Support

This component uses the Web Speech API. Check [browser compatibility](https://caniuse.com/?search=Web%20Speech%20API) for support details.

## TypeScript Support

The package includes TypeScript definitions. You can import types like this:

```typescript
import type { SpeechState } from "svelte-tts-highlight";
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with Svelte and TypeScript
- Inspired by the need for accessible text-to-speech solutions
- Thanks to all contributors and the Svelte community

## Support

- Create an issue for bug reports
- Star the repo if you find it useful
- Follow for updates

## Roadmap

- [ ] Add support for multiple voices
- [ ] Implement pause/resume functionality
- [ ] Add text selection synchronization
- [ ] Support for more languages
- [ ] Add automated testing
