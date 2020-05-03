import React, { useEffect, useRef, useState } from 'react';
import { render } from 'react-dom';
import { createJoymap, createEventModule } from '../../src/index';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import commands from './commands';
import { executeCommand } from './ckHelpers';

const joymap = createJoymap();
const module = createEventModule();
joymap.addModule(module);

const initialContent = `
  <h2>To <i>enhance</i> your experience, please connect a gamepad.</h2>
  <p>You can move the text cursor, select, print emojis and much much more from the comfort of your gamepad.</p>
  <p>Alternatively you can do all those things with a keyboard but that's boring.</p>
  <p>The buttons used in this demo are the following: Dpad, Face buttons (X, Y, A & B), R1, L1, Start, Select and Home.</p>
`;

function getInputIndex(value1, value2) {
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

function hookCompositeEvents(editorRef) {
  Object.entries(commands).forEach(([inputName, commandParams]) => {
    let delayCount = 0;
    let prevCommand = -1;
    module.addEvent(`${inputName} || (${inputName} && (L1 || R1))`, ([input, L1, R1]) => {
      if (editorRef.current) {
        const i = getInputIndex(L1.pressed, R1.pressed);

        if (delayCount > 40 || input.justChanged) {
          if (i !== prevCommand) {
            delayCount = 0;
          }
          executeCommand(editorRef, ...commandParams[i]);
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

function getRad(coordinates) {
  return Math.atan2(coordinates[1], coordinates[0]);
}

function getDist(coordinates) {
  return Math.sqrt(coordinates[0] ** 2 + coordinates[1] ** 2);
}

function Root() {
  const editorRef = useRef(null);
  const [intensity, setIntensity] = useState(0);
  const [angle, setAngle] = useState(0);
  const [font, setFont] = useState('inherit');

  useEffect(() => {
    hookCompositeEvents(editorRef);

    module.addEvent('R', ([RStick]) => {
      setIntensity(getDist(RStick.value));
      setAngle(getRad(RStick.value));
    });

    module.addEvent('L', ([LStick]) => {
      if (getRad(LStick.value) - 3 > 0) {
        setFont('cursive');
      } else {
        setFont('inherit');
      }
    });

    editorRef.current.editing.view.focus();

    joymap.start();

    return () => joymap.stop();
  }, []);

  const isEaster = font !== 'inherit';

  return (
    <div
      style={{
        paddingLeft: '2rem',
        paddingRight: '2rem',
        fontFamily: font,
        transform: isEaster ? 'rotate(1deg)' : '',
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
          data={initialContent}
          onInit={(editor) => {
            editorRef.current = editor;
          }}
        />
      </section>
      {isEaster && (
        <h3
          style={{
            transform: `rotate3d(${1 - intensity}, ${intensity ** -2}, ${intensity}, ${angle}rad)`,
          }}
        >
          Comic Sans engaged.
        </h3>
      )}
    </div>
  );
}

// Render the root component onto the app html container
render(<Root />, document.getElementById('app'));
