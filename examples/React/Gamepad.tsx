import React, { ReactNode, useState } from 'react';
import { QueryModule } from '../../src/index';

export const digitalInputs = {
  A: {
    borderRadius: '30px',
    top: '100px',
    right: '45px',
    width: '30px',
    height: '30px',
    transform: 'translate(-25px, 49px)',
  },
  B: {
    borderRadius: '30px',
    top: '100px',
    right: '45px',
    width: '30px',
    height: '30px',
    transform: 'translateY(25px)',
  },
  X: {
    borderRadius: '30px',
    top: '100px',
    right: '45px',
    width: '30px',
    height: '30px',
    transform: 'translate(-50px, 25px)',
  },
  Y: {
    borderRadius: '30px',
    top: '100px',
    right: '45px',
    width: '30px',
    height: '30px',
    transform: 'translateX(-25px)',
  },
  dpadLeft: {
    borderRadius: '10px',
    top: '100px',
    left: '45px',
    width: '40px',
    height: '30px',
    transform: 'translateY(30px)',
  },
  dpadRight: {
    borderRadius: '10px',
    top: '100px',
    left: '45px',
    width: '40px',
    height: '30px',
    transform: 'translate(55px, 30px)',
  },
  dpadDown: {
    borderRadius: '10px',
    top: '100px',
    left: '45px',
    width: '30px',
    height: '40px',
    transform: 'translate(32px, 50px)',
  },
  dpadUp: {
    borderRadius: '10px',
    top: '100px',
    left: '45px',
    width: '30px',
    height: '40px',
    transform: 'translateX(30px)',
  },
  start: {
    borderRadius: '10px',
    top: '106px',
    right: '170px',
    width: '30px',
    height: '30px',
  },
  select: {
    borderRadius: '10px',
    top: '106px',
    left: '170px',
    width: '30px',
    height: '30px',
  },
  home: {
    borderRadius: '10px',
    top: '144px',
    left: '223px',
    width: '40px',
    height: '40px',
  },
} as const;
type DigitalNames = keyof typeof digitalInputs;

const analogInputs = {
  L: { left: '150px' },
  R: { right: '150px' },
} as const;
type AnalogNames = keyof typeof analogInputs;

const shoulderInputs = {
  L1: { backgroundImage: 'url(/assets/L1.png)' },
  L2: { backgroundImage: 'url(/assets/L2.png)' },
  R1: { transform: 'scaleX(-1)', backgroundImage: 'url(/assets/L1.png)' },
  R2: { transform: 'scaleX(-1)', backgroundImage: 'url(/assets/L2.png)' },
} as const;
type ShoulderNames = keyof typeof shoulderInputs;

interface GamepadProps {
  backgroundColor: string;
  pressedColor: string;
  module: QueryModule;
  name: string;
  children: ReactNode;
}

interface ButtonProps {
  pressedColor: string;
  module: QueryModule;
  setWaitingFor: (value: string | null) => void;
}

function Stick({
  inputName,
  pressedColor,
  module,
  setWaitingFor,
}: ButtonProps & { inputName: AnalogNames }) {
  const [x, y] = module.getStick(inputName).value;
  const { pressed } = module.getButton(`${inputName}3`);
  const inputStyle = analogInputs[inputName];

  return (
    <div
      className="absolute bottom-13.25 z-15 w-12.5 h-12.5 bg-gray-500 border-[3px] border-black rounded-[40px] cursor-pointer"
      style={{
        ...inputStyle,
        transform: `translate(${x * 15}px, ${y * 15}px)`,
        backgroundColor: pressed ? pressedColor : 'gray',
      }}
      onClick={() => {
        if (module.isConnected()) {
          module.stickBindOnPress(inputName, () => setWaitingFor(null));
          setWaitingFor(inputName);
        }
      }}
    />
  );
}

function Digital({
  inputName,
  pressedColor,
  module,
  setWaitingFor,
}: ButtonProps & { inputName: DigitalNames }) {
  const { pressed } = module.getButton(inputName);
  const inputStyle = digitalInputs[inputName];

  return (
    <div
      className="absolute cursor-pointer"
      style={{
        backgroundColor: pressed ? pressedColor : 'gray',
        ...inputStyle,
      }}
      onClick={() => {
        if (module.isConnected()) {
          module.buttonBindOnPress(inputName, () => setWaitingFor(null));
          setWaitingFor(inputName);
        }
      }}
    />
  );
}

function Shoulder({ inputName, module }: { inputName: ShoulderNames; module: QueryModule }) {
  const { value } = module.getButton(inputName);
  const inputStyle = shoulderInputs[inputName];

  return (
    <div className="absolute w-full h-full" style={{ transform: `translateY(${value * 10}px)` }}>
      <div className="w-full h-full -mt-2.5" style={inputStyle} />
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
  const isDisconnected = !module.isConnected();
  const filter = isDisconnected ? 'brightness(40%)' : 'none';

  return (
    <div
      style={{
        position: 'relative',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '1rem',
        margin: '1rem',
        maxWidth: '50%',
        border: '8px dashed rgba(0, 0, 0, 0.5)',
        minWidth: '500px',
        backgroundColor: waitingFor ? 'red' : backgroundColor,
        filter,
      }}
    >
      <div style={{ position: 'relative', width: '484px', height: '300px', overflow: 'hidden' }}>
        <span
          style={{
            position: 'absolute',
            top: '70px',
            width: '100%',
            textAlign: 'center',
            zIndex: 15,
            fontSize: '2rem',
            color: pressedColor,
          }}
        >
          {name}
        </span>
        <img
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: 10,
            pointerEvents: 'none',
          }}
          src="/assets/gamepad.png"
        />
        {Object.keys(shoulderInputs).map((inputName) => (
          <Shoulder key={inputName} inputName={inputName as ShoulderNames} module={module} />
        ))}
        {Object.keys(analogInputs).map((inputName) => (
          <Stick
            key={inputName}
            inputName={inputName as AnalogNames}
            pressedColor={pressedColor}
            module={module}
            setWaitingFor={setWaitingFor}
          />
        ))}
        {Object.keys(digitalInputs).map((inputName) => (
          <Digital
            key={inputName}
            inputName={inputName as DigitalNames}
            pressedColor={pressedColor}
            module={module}
            setWaitingFor={setWaitingFor}
          />
        ))}
      </div>
      {!!waitingFor && (
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            zIndex: 30,
            color: 'white',
            fontSize: '3rem',
            background: 'rgba(0, 0, 0, 0.5)',
          }}
          onClick={() => {
            module.cancelListen();
            setWaitingFor(null);
          }}
        >
          Rebinding {waitingFor}
        </div>
      )}
      {children}
    </div>
  );
}
