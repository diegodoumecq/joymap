**[How to install](#how-to-install)** |
**[Key features](#key-features)** |
**[How to run all the things](#how-to-run-all-the-things)** |
**[Technologies](#technologies)** |
**[Default export API](#default-export-api)** |
**[Modules](#modules)** |
**[Simple example of usage](#simple-example-of-usage)** |
**[The Query Module](#the-query-module)** |
**[The Event Module](#the-event-module)** |
**[Composite Events](#composite-events)** |
**[Naming restrictions](#naming-restrictions)** |
**[Advanced example of usage](#advanced-example-of-usage)** |
**[Roadmap](#roadmap)**

# JOYMAP

A Javascript Gamepad browser API wrapper

For the simple cases use [the browser API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API). Otherwise, continue reading.

### How to install

Run **yarn add joymap**

### Key features

* Wraps the bare-bones gamepad standard into a flexible and more powerful API
* Organizes inputs and configurations by modules instead of by gamepad
* Modules can be query-based, event-based or (soon) Rx-based
* Supports button/stick mapping and remapping
* Supports user-oriented rebinding methods
* Button bindings are set by default to the standard defined by the spec, but all possible inputs are supported
* Can group buttons together (create a 'Jump' button from the A, B, L1 and R1 inputs)
* Can group sticks together (create one Analog stick from the average of L and R)

### How to run all the things

* Install all the dependencies with **yarn**
* Run a single example at a time on localhost:9001
  * For the React example, run **yarn react**
  * For the canvas example, run **yarn canvas**
  * For the HTML state log example, run **yarn log**
  * For the "fighting game training mode"-style input display example, run **yarn fighting**

### Technologies

JoyMap is developed using [webpack](https://webpack.js.org/) for the dev environment/bundling and [Babel](https://babeljs.io/) as a transpiler to support ES6 ([and beyond](https://babeljs.io/docs/plugins/preset-es2017/)).

There are four examples of usage, each of them showcasing the different ways to interact and use JoyMap and its modules while using different technologies.

### Default export API

Joymap exports an object with a few creation functions:

* createBaseModule
* createQueryModule
* createEventModule
* createJoyMap

From among them, the initial point of interaction with the library is **createJoyMap**. It is necessary to use this function since it handles polling the browser's Gamepad API and passes that data along to the different assigned modules. It does not, however, parse or map anything by itself: the modules are the ones that handle that responsibility.

* **createJoyMap(params?: Object) => joyMap** takes a single optional argument in the form of an object with the following possible values:
  * **onPoll** is a function that will be called at the end of each polling
  * **autoConnect** is a boolean that if true, will connect all newly created Modules with an unused gamepad if present at the moment of module creation
* When **createJoyMap** gets called, it returns an instance of JoyMap that has a bunch of functions:
  * **isSupported() => boolean** returns if gamepads are supported by the browser
  * **start() => void** repeatedly calls **poll()** using requestAnimationFrame
  * **stop() => void** stops calling **poll()**
  * **setOnPoll(onPoll: Function) => void** modifies internal state of **onPoll**
  * **setAutoConnect(autoConnect: boolean) => void** modifies internal state of **autoConnect**
  * **getGamepads() => Gamepad[]** returns all the available gamepads encountered since the last poll
  * **getModules() => module[]** returns an array of Modules (see the Modules section for more details)
  * **getUnusedPadIds() => string[]** Returns an array of Gamepad ids that are not currently assigned to a Module
  * **getUnusedPadId() => string | null** Same as above but returns only one if present
  * **addModule(module) => void** Adds an instanced module to JoyMap's Module array so that it can receive JoyMap updates
  * **removeModule(module) => void** Removes an instanced module from JoyMap's Module array
  * **clearModules() => void** Removes all modules from JoyMap's Module array
  * **poll() => void** Polls the browser gamepad API and updates all Modules with the data. Can be called manually or indirectly by using **start** and **stop**

The other three functions, createBaseModule, createQueryModule and createEventModule are used to create ...

### Modules

JoyMap's gamepad-accessing API is divided into modules. Each of these implement a basic interface but differ in the way that the input information can be extracted. Two of these modules are implemented for now: QueryModule and EventModule. A third one, RxModule is planned.

The three modules mentioned above work in similar ways, taking an options argument and returning the corresponding module. All of these use the createBaseModule function as a basis to build on top of it.

* **create[name]Module(params?: Object) => module** returns a module and takes a single optional argument in the form of an object with the following possible values:
  * **threshold** is a number between 0 and 1 that is used for all inputs as the minimum value required to be considered as pressed
  * **clampThreshold** is a boolean that if true, will set all not pressed inputs to 0
  * **padId** is the gamepad's Id that will be received on each **update** call

These functions all return a single module. All modules contain at least the following methods:

* **getPadId() => ?string** Returns the gamepad id assigned to Module, may be connected or not
* **isConnected() => boolean** Returns if the Module has assigned to it a currently connected gamepad
* **disconnect() => void** Sets the Module as not connected
* **connect(padId?: string) => void** Sets the Module as connected and assigns a new gamepad id if given one
* **getConfig() => string** Returns a serialized version of the internal structures that represent buttons, sticks, name, threshold and clampThreshold. Notice that Gamepad assignment is missing since we don't want to store information that won't be consistent between play sessions (different browsers give different Ids for the same gamepad, for instance)
* **setConfig(serializedString: string) => void** Parses the given string and assigns the module's internal state to whatever the parse results in
* **getButtonIndexes(...inputNames: string[]) => number[]** Returns the combined indexes of the given button names, even if given only one name
  * These indexes are the index number that a given button is bound to. For example, an Xbox360 X button's index is typically 0, so it is the first value found in the browser's Gamepad buttons array
  * Combines very well with **setButton**
* **getStickIndexes(...inputNames: string[]) => number[][]** Returns the combined indexes of the given stick names, again, same thing as getButtonIndexes but applied to sticks and their axes
* **setButton(inputName: string, indexes: number[]) => void** Sets a button name to the given index / indexes. This function does not care about duplication and can even take multiple indexes
 * When one single button is assigned to multiple indexes, the resulting value is the biggest of the specified indexes. The resulting object will still be { value, pressed, justChanged }
* **setStick(inputName: string, indexes: number[][], inverts?: number[]) => void** Sets a stick name to the given index / indexes. Same thing as **setButton** except it also takes the optional argument **inverts**. This argument is an array of booleans that will be assigned to the resulting stick, each bool representing if the corresponding axis should be inverted
* **invertSticks(inverts: number[], ...inputNames: string[]) => void** Sets an array of booleans as the inverts property of the given stick names
* **swapButtons(btn1: string, btn2: string) => void** Swaps two buttons' indexes
* **swapSticks(btn1: string, btn2: string, includeInverts?: boolean) => void** Swaps two sticks' indexes, and if **includeInverts** is true, also swaps the inverts of each stick
* **update(gamepad: Gamepad) => void** A function typically called on each poll by JoyMap. Updates internal structures and checks for the status of **listenButton** and **listenAxis**
* **cancelListen() => void** Will cancel the waiting process of **listenButton** or **listenAxis**
  * Note: You can only wait for buttons or for axes, never both at the same time
* **listenButton(callback: Function, quantity?: number, params?: Object) => void** Once called, JoyMap will ask in each poll for a **quantity** of pressed buttons and once such a thing is found given the criteria specified by the options, it will call callback with the activated input indexes as arguments
  * params: { waitFor = [1, 'polls'], consecutive = false, allowOffset = true }
  * Note: The above mentioned "activated input index" is an index corresponding to the raw gamepad.buttons array
  * **callback(...indexes)** Gets called when the module fulfills the specified criteria below
  * **quantity** The number of buttons that need to be pressed at the same time
  * **options.waitFor** An array consisting of an amount and the type that amount corresponds to. The default [10, 'polls'] will trigger the callback only after 10 consecutive polls are made that fulfill the other criteria options and quantity
  * **options.consecutive** Boolean that specifies if only consecutive indexes are allowed (when quantity > 1, useful mostly for axis and not buttons)
  * **options.allowOffset** Boolean that specifies if the first index returned should comply with being divisible by quantity (again, useful mostly for axis)
* **listenAxis(callback: Function, quantity?: number, params?: Object) => void** Functions the same way as **listenButton** except with a different default value for waitFor
  * params: { waitFor = [100, 'ms'], consecutive = false, allowOffset = true }
  * Note: Given that we have no true way of assuming what indexes correspond to which stick, under normal circumstances the player will only trigger the callback if the stick is pushed at an angle, activating both axis at the same time. Pushing the stick to the left, for example, would not trigger the callback
* **buttonBindOnPress(inputName: string, callback: Function, allowDuplication?: boolean) => void** A helper function that uses **listenButton** with the default options and sets the correct bindings for you
  * **inputName** is the name string of the button to be stored in this.buttons
  * **callback** is a callback that will be called (with argument index) when a pressed button is detected and the new input binding is set
  * **allowDuplication** is a flag that when false will swap bindings when one press would trigger more than one binding
* **stickBindOnPress(inputName: string, callback: Function, allowDuplication?: boolean) => void** Functions the same way as **buttonBindOnPress** except the callback will receive two indexes instead of just one due to the default settings of **listenAxis**
* **destroy() => void** Clears all the internal data structures

### Simple example of usage

    import createJoyMap, { createQueryModule } from 'joymap';
    
    function stepFunction() {
        // do stuff immediately after each Poll
    }

    const joyMap = createJoyMap({
        onPoll: stepFunction,
        autoConnect: true
    });
    const module1 = createQueryModule({ threshold: 0.2, clampThreshold: true });
    const module2 = createQueryModule({ threshold: 0.2, clampThreshold: true });
    const module3 = createQueryModule({ threshold: 0.2, clampThreshold: true });
    
    joyMap.addModule(module1);
    joyMap.addModule(module2);
    joyMap.addModule(module3);
    joyMap.start();
    
    //////
    // ... later on in a player-handling file
    //////
    
    const AButton = mario.module.getButtons('A'); // mario.module may be module1 from above
    if (AButton.pressed && AButton.justChanged && mario.isOnFloor()) {
        mario.jump();
    }

As you can see in the example above, you can create as many modules as you'd like. Each of them will be automatically assigned a gamepad if available (because we passed autoConnect: true) and each of them will stay assigned with that same gamepad even when plugged and unplugged multiple times.

For more a in-depth view on what the library supports and how, do please look at the examples in /examples.

### The Query Module

This module is based around polling the current state of the gamepad. It is also the only module that offers mappers: basically functions that map a player to a particular output.

* **getButtons(...names: string[]) => buttonState | buttonStates** Returns button objects depending on the format the arguments take
  * Given only one button name as argument, the returned object will be { value, pressed, justChanged }
  * Given more than one button name as arguments, the returned object will have the button names as keys and their values will be the same type of object already mentioned, meaning { value, pressed, justChanged }
  * Given no arguments, the returned value will be an object with ALL the button names as keys and their values being the already mentioned objects
  * So player.getButtons('A') will return { value, pressed, justChanged}, but player.getButtons('A', 'B') will return { A: { value, ... }, B: { value, ... } }
* **getSticks(...names: string[]) => stickState | stickStates** Functions the exact same way as getButtons save for the object format being { value, pressed, justChanged, inverts }
  * In this case, **value** is an array of numbers, each one representing an axis of the stick. These numbers also go from -1 to 1
* **getMappers(...names: string[]) => mapperState | mapperStates** Again, functions the exact same way as getButtons except that mappers don't have a set object format in particular for each mapper result
* **setMapper(mapperName: string, callback: Function) => void** Sets a mapper name to the given callback function. The result given by getMapper depends entirely on what this callback returns
  * This callback receives a reference to the player as the only argument
  * Note: do take into account that this callback will always be called by **getMapper** and at no other time
* **removeMapper(mapperName: string) => void** Removes a single mapper
* **clearMappers() => void** Clears all the mappers

### The Event Module

This module is based around setting up event callbacks to specific gamepad inputs.

* **addButtonEvent(eventName: string, callback: Function) => void** Adds a button event listener to be called when eventName happens
  * **eventName** Identifies the button/s to listen to. Can be either simple or composite
  * **callback** is the function that will be called when **eventName** happens. If the event was simple, it will also receive the button's state as the only argument
* **addStickEvent(eventName: string, callback: Function) => void** Adds a stick event listener to be called when eventName happens
  * **eventName** Identifies the stick to listen to. Can only be simple
  * **callback** is the function that will be called when **eventName** happens. It will receive the stick's state as the only argument
* **removeButtonEvent(eventName: string, callback: Function) => void** Removes a button event listener
  * The **eventName** and **callback** must match exactly to the ones used to listen to the event in the first place
* **removeStickEvent(eventName: string, callback: Function) => void** Removes a stick event listener
  * The **eventName** and **callback** must match exactly to the ones used to listen to the event in the first place
 
### Composite Events

Simple events are fairly easy to comprehend, press the **A** button and the corresponding eventName **A** will trigger. However, composite events are more flexible and useful than that because they allow for listening to various inputs at once through the use of operators.

There are two different operators available: **!** and **+**. The former being the classic **not** operator that basically lets you listen to something not being pressed. The latter being the **+** operator that is working as a boolean **&**, triggering only when two inputs are pressed.

To prune down event calls even further, one can listen to only justChanged button states by appending '.justChanged' to button names.

So you can do something like:

    import createJoyMap, { createEventModule } from 'joymap';
    
    const joyMap = createJoyMap();
    const module = createEventModule();
    
    joyMap.addModule(module);
    joyMap.addButtonEvent('A + B + !X + !Y', () => console.log('A & B pressed at the same time but not X nor Y'));
    joyMap.addButtonEvent('X + X.justChanged + Y', () => console.log('X is pressed & justChanged and Y is pressed'));
    joyMap.addButtonEvent('B + !B.justChanged', () => console.log('B pressed but not changed'));
    joyMap.start();


Also, note:

* Spaces are completely optional
* If the **eventName** is something invalid, like 'A B' or '+ A + B', the event will just never trigger
* Something like **joyMap.addButtonEvent('!B.justChanged', cb)** will trigger at all times that the button has not changed, meaning, almost all the time

### Naming restrictions

Throughout the library you're invited to name stuff. Like events, buttons, sticks and mappers. For the sake of making things easier for everybody in the future, these values shall only be alphanumeric. Why? Future-proofing mostly. The event handling system would require a strict naming convention to avoid mixing up names of stuff with possible operators.

### Advanced example of usage

Taken from the StateLog example:

    import createJoyMap, { createQueryModule } from 'joymap';
    
    function stepFunction() {
        // do stuff immediately after each Poll
    }
    
    const joyMap = createJoyMap();
    const mainModule = createQueryModule();
    joyMap.addModule(mainModule);
    
    mainModule.setButton('Jump', mainModule.getButtonIndexes('A', 'X', 'Y', 'L2', 'R2'));
    mainModule.setButton('Shoot', mainModule.getButtonIndexes('B'));
    mainModule.setButton('LookUp', mainModule.getButtonIndexes('dpadUp'));
    mainModule.setButton('LookDown', mainModule.getButtonIndexes('dpadDown'));
    mainModule.setButton('LookLeft', mainModule.getButtonIndexes('dpadLeft'));
    mainModule.setButton('LookRight', mainModule.getButtonIndexes('dpadRight'));
    mainModule.setButton('StickAverage', mainModule.getStickIndexes('L', 'R'));
    
    mainModule.setMapper('Point', module => module.getSticks('R').pressed);
    joyMap.start();

### Roadmap

Stuff to do. Keep in mind these bullet points are in no particular order.

* Add a new Rx module that uses [observable streams](https://github.com/Reactive-Extensions/RxJS)
* Add an event example
* Add a 3d example using [threejs](https://github.com/mrdoob/three.js/) or [whitestorm](https://github.com/WhitestormJS/whitestorm.js)
  * It should have a gamepad config menu for showcasing a more conventional button rebinding UI
  * It should also store in the sessionStorage the module config and on refresh restore it
  * It should also offer a "RESET" button for these module configs
* Consider the use of web-workers and whether or not they would be worth it in this context
* Implement rumble when it gets supported
  * [We do have vibration support but only for mobile devices](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API)
  * There's an [open issue](https://github.com/w3c/gamepad/issues/19) about this
