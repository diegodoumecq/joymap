import React, { ReactNode, useState } from 'react';
import { QueryModule } from '../../src/index';
import { map } from 'lodash/fp';

import { PadContainer, ReactInputs, ModuleName, Back, WaitingMessage, inputs } from './styles';

type InputNames = keyof typeof inputs;

const analogInputs: InputNames[] = ['L', 'R'];
const shoulderInputs: InputNames[] = ['L2', 'L1', 'R2', 'R1'];
const digitalInputs: InputNames[] = [
  'dpadUp',
  'dpadDown',
  'dpadLeft',
  'dpadRight',
  'A',
  'B',
  'X',
  'Y',
  'start',
  'select',
  'home',
];

interface GamepadProps {
  backgroundColor: string;
  pressedColor: string;
  module: QueryModule;
  name: string;
  children: ReactNode;
}

interface ButtonProps {
  inputName: keyof typeof inputs;
  pressedColor: string;
  module: QueryModule;
  setWaitingFor: (value: string | null) => void;
}

function Stick({ inputName, pressedColor, module, setWaitingFor }: ButtonProps) {
  const [x, y] = module.getStick(inputName).value;
  const { pressed } = module.getButton(`${inputName}3`);
  const StickComponent = inputs[inputName];

  return (
    <StickComponent
      onClick={() => {
        if (module.isConnected()) {
          module.stickBindOnPress(inputName, () => setWaitingFor(null));
          setWaitingFor(inputName);
        }
      }}
      style={{
        transform: `translate(${x * 15}px, ${y * 15}px)`,
        backgroundColor: pressed ? pressedColor : '',
      }}
    />
  );
}

function Digital({ inputName, pressedColor, module, setWaitingFor }: ButtonProps) {
  const { pressed } = module.getButton(inputName);
  const DigitalComponent = inputs[inputName];

  return (
    <DigitalComponent
      style={{ backgroundColor: pressed ? pressedColor : '' }}
      onClick={() => {
        if (module.isConnected()) {
          module.buttonBindOnPress(inputName, () => setWaitingFor(null));
          setWaitingFor(inputName);
        }
      }}
    />
  );
}

function Shoulder({ inputName, module }: { inputName: InputNames; module: QueryModule }) {
  const { value } = module.getButton(inputName);
  const ShoulderComponent = inputs[inputName];

  return (
    <div
      style={{
        position: 'absolute',
        transform: `translateY(${value * 10}px)`,
        width: '100%',
        height: '100%',
      }}
    >
      <ShoulderComponent />
    </div>
  );
}

export default function Gamepad({
  backgroundColor,
  pressedColor,
  module,
  name,
  children,
}: GamepadProps) {
  const [waitingFor, setWaitingFor] = useState<string | null>(null);

  return (
    <PadContainer
      style={{ backgroundColor }}
      disconnected={!module.isConnected()}
      waiting={!!waitingFor}
    >
      <ReactInputs>
        <ModuleName style={{ color: pressedColor }}>{name}</ModuleName>
        <Back />
        {map(
          (inputName) => (
            <Shoulder key={inputName} inputName={inputName} module={module} />
          ),
          shoulderInputs,
        )}
        {map(
          (inputName) => (
            <Stick
              key={inputName}
              inputName={inputName}
              pressedColor={pressedColor}
              module={module}
              setWaitingFor={setWaitingFor}
            />
          ),
          analogInputs,
        )}
        {map(
          (inputName) => (
            <Digital
              key={inputName}
              inputName={inputName}
              pressedColor={pressedColor}
              module={module}
              setWaitingFor={setWaitingFor}
            />
          ),
          digitalInputs,
        )}
      </ReactInputs>
      {!!waitingFor && (
        <WaitingMessage
          onClick={() => {
            module.cancelListen();
            setWaitingFor(null);
          }}
        >
          Rebinding {waitingFor}
        </WaitingMessage>
      )}
      {children}
    </PadContainer>
  );
}
