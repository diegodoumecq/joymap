interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => ISpeechRecognition;
    webkitSpeechRecognition: new () => ISpeechRecognition;
  }
}

let recognition: ISpeechRecognition | null = null;
let currentElement: HTMLInputElement | HTMLTextAreaElement | null = null;
let errorElement: HTMLInputElement | HTMLTextAreaElement | null = null;

export function initVoiceRecognition() {
  const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognitionCtor) {
    console.warn('Speech recognition not supported');
    return null;
  }

  recognition = new SpeechRecognitionCtor();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = (event: SpeechRecognitionEvent) => {
    if (!currentElement) return;

    let transcript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      transcript += result[0].transcript;
    }

    if (transcript) {
      insertTextAtCursor(currentElement, transcript);
    }
  };

  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    const target = currentElement || errorElement;
    if (event.error === 'network') {
      if (target) {
        insertTextAtCursor(target, '[Speech not available - check network or try Chrome]');
        errorElement = null;
      }
    } else if (event.error !== 'no-speech') {
      if (target) {
        insertTextAtCursor(target, `[${event.error}]`);
        errorElement = null;
      }
    }
  };

  return recognition;
}

export function startListening(element: HTMLInputElement | HTMLTextAreaElement) {
  if (!recognition) return;

  currentElement = element;
  errorElement = element;
  showMicIcon();

  try {
    recognition.start();
  } catch (e) {
    hideMicIcon();
  }
}

export function stopListening() {
  hideMicIcon();
  currentElement = null;

  if (recognition) {
    try {
      recognition.stop();
    } catch (e) {
      void e;
    }
  }
}

function insertTextAtCursor(element: HTMLInputElement | HTMLTextAreaElement, text: string) {
  const normalizedText = text.replace(/[\r\n]+/g, ' ').trim() + ' ';

  const start = element.selectionStart ?? element.value.length;
  const end = element.selectionEnd ?? element.value.length;
  const before = element.value.substring(0, start);
  const after = element.value.substring(end);
  element.value = before + normalizedText + after;
  element.selectionStart = element.selectionEnd = start + normalizedText.length;
  element.dispatchEvent(new Event('input', { bubbles: true }));
}

function showMicIcon() {
  const icon = document.getElementById('mic-icon');
  if (icon) {
    icon.style.display = 'flex';
  }
}

function hideMicIcon() {
  const icon = document.getElementById('mic-icon');
  if (icon) {
    icon.style.display = 'none';
  }
}
