export type Button = number[];

export type Stick = { indexes: number[][]; inverts: boolean[] };

export interface ButtonResult {
  type: 'button';
  value: number;
  pressed: boolean;
  justChanged: boolean;
}

export interface StickResult {
  type: 'stick';
  value: number[];
  pressed: boolean;
  justChanged: boolean;
  inverts: boolean[];
}

export type InputResult = ButtonResult | StickResult;

export type RawGamepad = Gamepad;

export interface CustomGamepad {
  axes: number[];
  buttons: number[];
  rawPad?: RawGamepad;
}

export interface JoymapParams {
  onPoll?: () => void;
  autoConnect?: boolean;
}

export interface BaseParams {
  padId?: string;
  threshold?: number;
  clampThreshold?: boolean;
}

export type Effect =
  | number
  | {
      duration: number;
      weakMagnitude?: number;
      strongMagnitude?: number;
    };

// StrictEffect means all values are valid (duration > 0, magnitudes between 0 and 1)
export interface StrictEffect {
  duration: number;
  weakMagnitude: number;
  strongMagnitude: number;
}

export interface ListenOptions {
  callback: (indexes: number[] | number[][]) => void;
  quantity: number;
  type: 'buttons' | 'axes';
  currentValue: number;
  useTimeStamp: boolean;
  targetValue: number;
  consecutive: boolean;
  allowOffset: boolean;
}

export interface InputToken {
  inputName: string;
  inputState: 'justPressed' | 'justReleased' | 'pressed' | 'released';
}

export type OperatorToken = string;

export type EventToken = InputToken | OperatorToken;

export interface InputEvent {
  name: string;
  callback: (button: InputResult[]) => void;
  tokens: EventToken[];
}
