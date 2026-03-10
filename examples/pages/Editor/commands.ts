import { LoremIpsum } from 'lorem-ipsum';

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

type CommandName =
  | 'move'
  | 'select'
  | 'input'
  | 'delete'
  | 'forwardDelete'
  | 'numberedList'
  | 'bulletedList'
  | 'enter'
  | 'bold'
  | 'italic'
  | 'blockQuote'
  | 'undo'
  | 'redo';

export type CommandPrimitive = string | { text: string };
export type CommandValue = CommandPrimitive | (() => CommandPrimitive);
export type Command = [CommandName] | [CommandName, CommandValue];

export const commands: Record<string, [Command, Command, Command, Command]> = {
  dpadUp: [
    ['move', 'upward'],
    ['select', 'upward'],
    ['input', { text: '👆' }],
    ['input', { text: '👍' }],
  ],
  dpadDown: [
    ['move', 'downward'],
    ['select', 'downward'],
    ['input', { text: '👇' }],
    ['input', { text: '👎' }],
  ],
  dpadLeft: [
    ['move', 'backward'],
    ['select', 'backward'],
    ['input', { text: '👈' }],
    ['input', { text: '🤛' }],
  ],
  dpadRight: [
    ['move', 'forward'],
    ['select', 'forward'],
    ['input', { text: '👉' }],
    ['input', { text: '🤜' }],
  ],
  A: [
    ['input', { text: '😂' }],
    ['input', { text: '🤣' }],
    ['input', { text: '❤️' }],
    ['input', { text: '😍' }],
  ],
  B: [
    ['input', { text: '😊' }],
    ['input', { text: '🤪' }],
    ['input', { text: '😭' }],
    ['input', { text: '🙏' }],
  ],
  X: [['delete'], ['forwardDelete'], ['numberedList'], ['bulletedList']],
  Y: [['enter'], ['bold'], ['italic'], ['blockQuote']],
  start: [
    ['input', { text: '💩' }],
    ['input', { text: '🔥' }],
    ['input', { text: '🤔' }],
    ['input', { text: '✔' }],
  ],
  select: [
    ['undo'],
    ['redo'],
    ['input', () => ({ text: ` ${lorem.generateWords(1)}` })],
    ['input', () => ({ text: ` ${lorem.generateSentences(1)}` })],
  ],
  home: [
    ['input', { text: '🍑' }],
    ['input', { text: '🍆' }],
    ['input', { text: '🍌' }],
    ['input', { text: '🦠' }],
  ],
};
