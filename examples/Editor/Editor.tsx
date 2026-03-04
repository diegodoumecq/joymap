import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Bold, ClassicEditor, Essentials, Italic, List, Paragraph } from 'ckeditor5';
import { createEventModule, createJoymap, StickResult } from 'joymap';
import { createRoot } from 'react-dom/client';

import 'ckeditor5/ckeditor5.css';
import './custom.css';

import { executeCommand } from './ckHelpers';
import { commands } from './commands';

const joymap = createJoymap();
const module = createEventModule();
joymap.addModule(module);

const initialData = `
  <h2>To <i>enhance</i> your experience, please connect a gamepad.</h2>
  <p>You can move the text cursor, select, print emojis and much much more from the comfort of your gamepad.</p>
  <p>Alternatively you can do all those things with a keyboard but that's boring.</p>
  <p>The buttons used in this demo are the following: Dpad, Face buttons (X, Y, A & B), R1, L1, Start, Select and Home.</p>
`;

function getInputIndex(value1: boolean, value2: boolean) {
  if (value1 && value2) {
    return 3;
  }

  if (!value1 && value2) {
    return 2;
  }

  if (value1 && !value2) {
    return 1;
  }

  return 0;
}

function hookCompositeEvents(editor: ClassicEditor) {
  Object.entries(commands).forEach(([inputName, commandParams]) => {
    let delayCount = 0;
    let prevCommand = -1;
    module.addEvent(`${inputName} || (${inputName} && (L1 || R1))`, ([input, L1, R1]: any[]) => {
      if (editor) {
        const i = getInputIndex(L1.pressed, R1.pressed);

        if (delayCount > 40 || input.justChanged) {
          if (i !== prevCommand) {
            delayCount = 0;
          }
          executeCommand(editor, commandParams[i][0], commandParams[i][1]);
          prevCommand = i;
        }
        delayCount += 1;
      }
    });

    module.addEvent(`${inputName}.justReleased`, () => {
      delayCount = 0;
    });
  });
}

function getRad(coordinates: number[]) {
  return Math.atan2(coordinates[1], coordinates[0]);
}

function getDist(coordinates: number[]) {
  return Math.sqrt(coordinates[0] ** 2 + coordinates[1] ** 2);
}

const fontFamilies = ['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui'];
const angleRange = 360 / fontFamilies.length;

function Main() {
  const [editor, setEditor] = useState<ClassicEditor | null>();
  const [intensity, setIntensity] = useState(0);
  const [angle, setAngle] = useState(0);
  const [font, setFont] = useState('inherit');

  useEffect(() => {
    if (editor) {
      hookCompositeEvents(editor);

      module.addEvent('R', ([RStick]) => {
        setIntensity(getDist((RStick as StickResult).value));
        setAngle(getRad((RStick as StickResult).value));
      });

      module.addEvent('L', ([LStick]) => {
        const deg = 180 + (getRad((LStick as StickResult).value) * 180) / Math.PI;
        const activation = getDist((LStick as StickResult).value);
        if (activation > 0.9) {
          setFont(fontFamilies[Math.floor(deg / angleRange)]);
        }
      });

      editor.editing.view.focus();

      joymap.start();

      return () => joymap.stop();
    }
    return;
  }, [editor]);

  return (
    <div
      style={{
        paddingLeft: '2rem',
        paddingRight: '2rem',
        fontFamily: font,
      }}
    >
      <header
        style={{
          textAlign: 'center',
          transform: `rotate3d(${1 - intensity}, ${intensity ** -2}, ${intensity}, ${angle}rad)`,
        }}
      >
        <h3>EventModule-based example using CKEditor5.</h3>
      </header>
      <section>
        <CKEditor
          editor={ClassicEditor}
          config={{
            plugins: [Essentials, Paragraph, Bold, Italic, List],
            toolbar: ['undo', 'redo', '|', 'bold', 'italic', '|', 'numberedList', 'bulletedList'],
            initialData,
          }}
          onReady={(editor) => {
            setEditor(editor);
          }}
        />
      </section>
    </div>
  );
}

const element = document.createElement('div');
document.body.appendChild(element);

const root = createRoot(element);
root.render(<Main />);
