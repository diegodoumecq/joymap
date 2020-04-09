// Based on https://codepen.io/anon/pen/yKgYGz

interface Gamepad {
  vibrationActuator?: {
    playEffect: (type: string | number, effect: Effect) => Promise<string>;
    reset: () => Promise<string>;
  };
}

interface Effect {
  duration: number;
  startDelay?: number;
  strongMagnitude?: number;
  weakMagnitude?: number;
}

type EffectGenerator = (pad: Gamepad) => Effect;

/////////////
// Dynamic effects
/////////////

const dynamicEffectGenerators: (EffectGenerator | null)[] = [];

function hasDynamicEffect(index: number) {
  console.log(`hasDynamicEffect(${index}): ${!dynamicEffectGenerators[index]}`);
  return !dynamicEffectGenerators[index];
}

function startDynamicEffect(index: number, effectGenerator: EffectGenerator) {
  stopDynamicEffect(index);
  dynamicEffectGenerators[index] = effectGenerator;
  hasDynamicEffect(index);
  window.requestAnimationFrame(dynamicEffectFrameCb);
}

function stopDynamicEffect(index: number) {
  dynamicEffectGenerators[index] = null;
}

function dynamicEffectSuccess(index: number, result: string) {
  if (hasDynamicEffect(index) && result == 'preempted') {
    //console.log("Continuing a dynamic effect on gamepad at index 0");
  } else {
    effectSuccess(result);
  }
}

function dynamicEffectFailure(index: number) {
  stopDynamicEffect(index);
  effectFailure();
}

// Unused?
function effectDynamicContinue(result: string, index: number, effectGenerator: EffectGenerator) {
  if (result == 'complete') {
    console.log(`Continuing a haptic effect on gamepad at index ${index}`);
    const pads = navigator.getGamepads();
    const pad = pads[index];
    if (pad) {
      playEffect(
        index,
        effectGenerator(pad),
        (r) => effectDynamicContinue(r, index, effectGenerator),
        effectFailure,
      );
    } else {
      console.log(`No connected gamepad at index ${index}`);
    }
  } else {
    effectSuccess(result);
  }
}

function dynamicEffectFrameCb() {
  let anyPadActive = false;
  const pads = navigator.getGamepads();
  for (let i = 0; i < pads.length; i++) {
    const pad = pads[i];
    if (pad && hasDynamicEffect(i)) {
      const effect = dynamicEffectGenerators[i]?.(pad);
      if (effect) {
        playEffect(
          i,
          effect,
          (r) => dynamicEffectSuccess(i, r),
          () => dynamicEffectFailure(i),
        );
        anyPadActive = true;
      }
    } else {
      stopDynamicEffect(0);
    }
  }

  if (anyPadActive) {
    window.requestAnimationFrame(dynamicEffectFrameCb);
  }
}

// Generate new effects dynamically based on the gamepad state.
function dynamicVib(index: number) {
  stopDynamicEffect(index);
  console.log(`Starting a dynamic haptic effect on gamepad at index ${index}`);
  startDynamicEffect(index, (pad: Gamepad) => {
    return {
      duration: 1000,
      strongMagnitude: pad.buttons[6].value,
      weakMagnitude: pad.buttons[7].value,
    };
  });
}

/////////////
// Common
/////////////

// Wrapper for vibrationActuator.reset that logs a warning when no gamepad is present.
function reset(index: number, success: (result: string) => void, failure: () => void) {
  stopDynamicEffect(index);
  const pads = navigator.getGamepads();
  const pad = pads[index];
  if (pad && pad.vibrationActuator) {
    pad.vibrationActuator.reset().then(success, failure);
  } else if (!pad) {
    console.log(`No connected gamepad at index ${index}`);
  } else if (!pad.vibrationActuator) {
    console.log(`No haptics support for gamepad at index ${index}`);
  }
}

// Wrapper for vibrationActuator.playEffect that logs a warning when no gamepad is present.
function playEffect(
  index: number,
  effect: Effect,
  success: (result: string) => void,
  failure: () => void,
) {
  const pads = navigator.getGamepads();
  const pad = pads[index];
  if (pad && pad.vibrationActuator) {
    pad.vibrationActuator.playEffect('dual-rumble', effect).then(success, failure);
  } else if (!pad) {
    console.log(`No connected gamepad at index ${index}`);
  } else if (!pad.vibrationActuator) {
    console.log(`No haptics support for gamepad at index ${index}`);
  }
}

// Stop vibration.
function noVib(index: number) {
  stopDynamicEffect(index);
  console.log(`Stopping haptics on gamepad at index ${index}`);
  reset(index, effectSuccess, effectFailure);
}

// Play a single vibration effect.
function singleVib(index: number, effect: Effect) {
  stopDynamicEffect(index);
  console.log(
    `Sending a single haptic effect to gamepad at index ${index}: ` +
      `{ startDelay: ${effect.startDelay}, duration: ${effect.duration}, strongMagnitude: ${effect.strongMagnitude}, weakMagnitude: ${effect.weakMagnitude} }`,
  );
  playEffect(index, effect, effectSuccess, effectFailure);
}

// Play a continuous vibration effect by queuing a new effect in the
// Promise success callback.
function continuousVib(index: number, effect: Effect) {
  stopDynamicEffect(index);
  console.log(
    `Starting a continuous haptic effect on gamepad at index ${index}: ` +
      `{ startDelay: ${effect.startDelay}, duration: ${effect.duration}, strongMagnitude: ${effect.strongMagnitude}, weakMagnitude: ${effect.weakMagnitude} }`,
  );
  playEffect(index, effect, (r) => effectContinue(r, index, effect), effectFailure);
}

// Alternate between two effects.
function alternatingVib(index: number, effect1: Effect, effect2: Effect) {
  stopDynamicEffect(index);
  console.log(
    `Starting an alternating haptic effect on gamepad at index ${index}: ` +
      `{ startDelay: ${effect1.startDelay}, duration: ${effect1.duration}, strongMagnitude: ${effect1.strongMagnitude}, weakMagnitude: ${effect1.weakMagnitude} }, ` +
      `{ startDelay: ${effect2.startDelay}, duration: ${effect2.duration}, strongMagnitude: ${effect2.strongMagnitude}, weakMagnitude: ${effect2.weakMagnitude} }, `,
  );
  playEffect(
    index,
    effect1,
    (r) => effectSwapAndContinue(r, index, effect2, effect1),
    effectFailure,
  );
}

// Generate a rumble effect with magnitude proportional to the
// trigger button values.

function effectSuccess(result: string) {
  console.log(`Promise resolved: ${result}`);
}

function effectFailure() {
  console.log('Promise rejected');
}

function effectContinue(result: string, index: number, effect: Effect) {
  if (result == 'complete') {
    console.log(`Continuing a haptic effect on gamepad at index ${index}`);
    playEffect(index, effect, (r) => effectContinue(r, index, effect), effectFailure);
  } else {
    effectSuccess(result);
  }
}

function effectSwapAndContinue(result: string, index: number, effect1: Effect, effect2: Effect) {
  if (result == 'complete') {
    console.log(`Continuing a haptic effect on gamepad at index ${index}`);
    playEffect(
      index,
      effect1,
      (r) => effectSwapAndContinue(r, index, effect2, effect1),
      effectFailure,
    );
  } else {
    effectSuccess(result);
  }
}

/**
<html>
  <body>
    <h1>Rumble</h1>
    <ul>
      <li><button onclick="noVib(0)">Stop vibration</button> using reset
      <li><button onclick="singleVib(0, { duration: 0 })">Stop vibration</button> using playEffect with a zero-length effect
      <li><button onclick="singleVib(0, { duration: 1000, strongMagnitude: 1.0 })">Strong vibration for 1 second</button>
      <li><button onclick="singleVib(0, { duration: 1000, weakMagnitude: 1.0 })">Weak vibration for 1 second</button>
      <li><button onclick="singleVib(0, { duration: 1000, strongMagnitude: 1.0, weakMagnitude: 1.0 })">Dual vibration for 1 second</button>
      <li><button onclick="singleVib(0, { duration: 5000, strongMagnitude: 1.0 })">Strong vibration for 5 seconds</button>
      <li><button onclick="singleVib(0, { duration: 5000, weakMagnitude: 1.0 })">Weak vibration for 5 seconds</button>
      <li><button onclick="singleVib(0, { duration: 5000, strongMagnitude: 1.0, weakMagnitude: 1.0 })">Dual vibration for 5 seconds</button>
      <li><button onclick="continuousVib(0, { duration: 1000, strongMagnitude: 1.0 })">Continuous strong vibration</button>
      <li><button onclick="continuousVib(0, { duration: 1000, weakMagnitude: 1.0 })">Continuous weak vibration</button>
      <li><button onclick="continuousVib(0, { duration: 1000, strongMagnitude: 1.0, weakMagnitude: 1.0 })">Continuous dual vibration</button>
      <li><button onclick="continuousVib(0, { startDelay: 1000, duration: 1000, weakMagnitude: 1.0 })">Repeating pulse (1 second on, 1 second off)</button> using startDelay
      <li><button onclick="alternatingVib(0, { duration: 1000, weakMagnitude: 1.0 }, { duration: 1000 })">Repeating pulse (1 second on, 1 second off)</button> using alternating effects
      <li><button onclick="alternatingVib(0, { duration: 5000, weakMagnitude: 1.0 }, { duration: 5000 })">Slow repeating pulse (5 seconds on, 5 seconds off)</button> using alternating effects
      <li><button onclick="alternatingVib(0, { duration: 1000, strongMagnitude: 1.0 }, { duration: 1000, weakMagnitude: 1.0 })">Alternating strong/weak vibration (1 second strong, 1 second weak)</button>
      <li><button onclick="alternatingVib(0, { duration: 1000, weakMagnitude: 1.0 }, { duration: 1000, strongMagnitude: 1.0, weakMagnitude: 1.0 })">Alternating weak/dual vibration (1 second weak, 1 second dual)</button>
      <li><button onclick="dynamicVib(0, triggerGenerator)">Dynamic vibration (uses the gamepad trigger buttons to modify the intensity)</button>
    </ul>
  </body>
</html>
**/
