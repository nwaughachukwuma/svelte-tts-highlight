export interface ParagraphItem {
  words: string[];
  pOffset: number;
  lbOffset: number;
  text: string;
}

export function getWordOffsets(text: string) {
  const regex = /\S+/g;
  const offsets: number[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text))) {
    offsets.push(match.index);
  }

  return offsets;
}

export function getParagraphsItems(text: string): ParagraphItem[] {
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

// Binary search for better performance with large texts
export function findWordIndex(
  wordsOffsets: number[],
  charIndex: number
): number {
  let low = 0;
  let high = wordsOffsets.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (charIndex >= wordsOffsets[mid]) {
      if (
        mid === wordsOffsets.length - 1 ||
        charIndex < wordsOffsets[mid + 1]
      ) {
        return mid;
      }
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return low;
}
