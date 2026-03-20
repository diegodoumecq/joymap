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
    const current = document.activeElement;
    if (!(current instanceof HTMLInputElement) && !(current instanceof HTMLTextAreaElement)) {
      return;
    }

    let transcript = '';

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      transcript += result[0].transcript;
    }

    if (transcript) {
      insertTextAtCursor(current, transcript);
    }
  };

  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    const current = document.activeElement;
    if (!(current instanceof HTMLInputElement) && !(current instanceof HTMLTextAreaElement)) {
      return;
    }

    if (event.error === 'network') {
      insertTextAtCursor(current, '[Speech not available - check network or try Chrome]');
    } else if (event.error !== 'no-speech') {
      insertTextAtCursor(current, `[${event.error}]`);
    }
  };

  return recognition;
}

export function startListening() {
  if (!recognition) return;

  showMicIcon();

  try {
    recognition.start();
  } catch (e) {
    hideMicIcon();
  }
}

export function stopListening() {
  hideMicIcon();

  if (recognition) {
    try {
      recognition.stop();
    } catch (e) {
      void e;
    }
  }
}

function insertTextAtCursor(element: HTMLInputElement | HTMLTextAreaElement, text: string) {
  if (!element.isConnected || !('selectionStart' in element)) return;

  try {
    const normalizedText = text.replace(/[\r\n]+/g, ' ').trim() + ' ';

    const start = element.selectionStart ?? element.value.length;
    const end = element.selectionEnd ?? element.value.length;
    const before = element.value.substring(0, start);
    const after = element.value.substring(end);
    element.value = before + normalizedText + after;
    element.selectionStart = element.selectionEnd = start + normalizedText.length;
    element.dispatchEvent(new Event('input', { bubbles: true }));
  } catch {
    // Element may have become invalid (e.g., detached from DOM)
  }
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
