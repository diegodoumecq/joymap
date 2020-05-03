# JOYMAP

A Javascript Gamepad browser API wrapper that chops, slices and dices

## Table of contents

**[Key features](#key-features)** |
**[How to install](#how-to-install)** |
**[Examples](#examples)** |
**[How to use](#how-to-use)** |
**[Modules](#modules)** |
**[Simple example of usage](#simple-example-of-usage)** |
**[Rumble support](#rumble-support)** |
**[Naming restrictions](#naming-restrictions)** |
**[Roadmap](#roadmap)**

### Key features

* Wraps the bare-bones gamepad standard into a flexible and more powerful API
* Organizes inputs and configurations by modules instead of by gamepad
* Modules can be query-based, event-based or Rx-based
* Supports button/stick mapping and remapping
* Supports user-oriented rebinding methods
* [Lots of handy examples](https://diegodoumecq.github.io/joymap/)
* Button bindings are set by default to the standard defined by the spec, but all possible inputs are supported
* Can group buttons together (create a 'Jump' button from the A, B, L1 and R1 inputs)
* Can group sticks together (create one Analog stick from the average of L and R)
* Allows for event operators with the event module, for example: 'L1.justPressed && L.released && (A || B || customButtonDefinedPreviously)'
* Supports Chrome's implementation of rumble/haptic feedback
* Uses and exports Typescript types

### How to install

You can install it with npm/yarn or just add a `<script>` tag with the joymap.min.js file and access the library through the joymap global var

### Examples

* You can play with our examples here: https://diegodoumecq.github.io/joymap/ (includes handy links to codesandbox and the github source code)
* Alternatively, you can also clone/download the repo and after installing dependencies use **yarn dev** to mount it all on localhost:9001

### How to use

Joymap exports an object with a few creation functions:

* createJoymap
* createBaseModule
* createQueryModule
* createStreamModule
* createEventModule

From among them, the initial point of interaction with the library is **createJoymap**. It is necessary to use this function since it handles polling the browser's Gamepad API and passes that data along to the different assigned modules. It does not, however, parse or map anything by itself: the modules are the ones that handle that responsibility.

* **createJoymap(params?: Object) => Joymap** takes a single optional argument in the form of an object with the following possible values:
  * **onPoll** is a function that will be called at the end of each polling
  * **autoConnect** is a boolean that if true, will connect all newly created Modules with an unused gamepad if present at the moment of module creation
* When **createJoymap** gets called, it returns an instance of Joymap that has a bunch of functions:
  * **isSupported() => boolean** returns if gamepads are supported by the browser
  * **start() => void** repeatedly calls **poll()** using requestAnimationFrame
  * **stop() => void** stops calling **poll()**
  * **setOnPoll(onPoll: () => void) => void** modifies internal state of **onPoll**
  * **setAutoConnect(autoConnect: boolean) => void** modifies internal state of **autoConnect**
  * **getGamepads() => Gamepad[]** returns all the available gamepads encountered since the last poll
  * **getModules() => AnyModule[]** returns an array of Modules (see the Modules section for more details)
  * **getUnusedPadIds() => string[]** Returns an array of Gamepad ids that are not currently assigned to a Module
  * **getUnusedPadId() => string | undefined** Same as above but returns only one if present
  * **addModule(module: AnyModule) => void** Adds an instanced module to Joymap's Module array so that it can receive Joymap updates
  * **removeModule(module: AnyModule) => void** Removes an instanced module from Joymap's Module array
  * **clearModules() => void** Removes all modules from Joymap's Module array
  * **poll() => void** Polls the browser gamepad API and updates all Modules with the data. Can be called manually or indirectly by using **start** and **stop**

The other functions are used to create ...

### Modules

Joymap's gamepad-accessing API is divided into modules. Each of these implement a basic interface but differ in the way that the input information can be extracted. Three of these modules are implemented for now: QueryModule, StreamModule and EventModule.

The three modules mentioned above work in similar ways, taking an options argument and returning the corresponding module. All of these use the createBaseModule function as a basis to build on top of it.

* **create[type]Module(params?: Object) => module** returns a module and takes a single optional argument in the form of an object with the following possible values:
  * **threshold?: number** is the number between 0 and 1 that is used for all inputs as the minimum value required to be considered as pressed. Default is 0.2
  * **clampThreshold?: boolean** is a boolean that if true, will set all not pressed inputs to 0. Default is true
  * **padId?: string** is the gamepad's Id that will be received on each **update** call. Default is null

### Simple example of usage

```javascript
import createJoymap, { createQueryModule } from 'joymap';

function stepFunction() {
  // do stuff immediately after each Gamepad Poll
}

const joymap = createJoymap({
  onPoll: stepFunction,
  autoConnect: true
});
const module1 = createQueryModule({ threshold: 0.2, clampThreshold: true });
const module2 = createQueryModule({ threshold: 0.2, clampThreshold: true });
const module3 = createQueryModule({ threshold: 0.2, clampThreshold: true });

joymap.addModule(module1);
joymap.addModule(module2);
joymap.addModule(module3);
joymap.start();

//////
// ... later on in a player-handling file
//////

const AButton = mario.module.getButton('A'); // mario.module could be module1 from above
if (AButton.pressed && AButton.justChanged && mario.isOnFloor()) {
  mario.jump();
}
```

As you can see in the example above, you can create as many modules as you'd like. Each of them will be automatically assigned a gamepad if available (because we passed autoConnect: true) and each of them will stay assigned to that same gamepad even when plugged and unplugged multiple times.

For more a in-depth view on what the modules support and how, do please look at the examples.

### Rumble support

Right now the library offers rumble suport based on Chrome's implementation of the Gamepad's **vibrationActuator.playEffect** function. To use this feature you can simply access any module and use the following methods:

  Note: An *Effect* is an object of type *{ duration: number; weakMagnitude?: number; strongMagnitude?: number; }*

* **isRumbleSupported(rawPad?: RawGamepad) => boolean | null** gives you whether the module's gamepad (or the one being passed as argument) supports rumble or not. Will return null only if called without arguments and no gamepad has been assigned to the module.
* **addRumble(effect: Effect | (Effect | number)[], channelName?: string) => void** lets you play a single effect or a timeline of different effects and pauses. The channelName is used to distinguish from various sources of rumbling, so they don't cancel each other. If a channelName is not provided then the 'default' channel is used.
* **stopRumble(channelName?: string) => void** lets you stop all rumbling from a particular channel. If a channelName is not provided then the 'default' channel is used.

### Naming restrictions

Throughout the library you're invited to name things. Like events, buttons, sticks and mappers. For the sake of making things easier for everybody in the future, these values shall only be alphanumeric. Why? Future-proofing mostly. For example, the event handling system requires this to avoid mixing up names of stuff with possible operators in the future.

### Roadmap

Stuff to do. Keep in mind these bullet points are in no particular order.

* Improve event module: add more event operator
* Add support for hapticActuators in firefox (seems to work on some VR gamepads apparently, need to get my hands on some)
* Add a 3d example using [threejs](https://github.com/mrdoob/three.js/) or [whitestorm](https://github.com/WhitestormJS/whitestorm.js) or [playcanvas](https://github.com/playcanvas/engine)
  * It should have a gamepad config menu for showcasing a more conventional button rebinding UI
  * It should also store in the sessionStorage the module config and on refresh restore it
  * It should also offer a "RESET" button for these module configs
