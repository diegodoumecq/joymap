**[How to install](#how-to-install)** |
**[Key features](#key-features)** |
**[How to run all the things](#how-to-run-all-the-things)** |
**[Default export API](#default-export-api)** |
**[Modules](#modules)** |
**[Simple example of usage](#simple-example-of-usage)** |
**[Naming restrictions](#naming-restrictions)** |
**[Roadmap](#roadmap)**

# JOYMAP

A Javascript Gamepad browser API wrapper

For the simple cases use [the browser API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API). Otherwise, continue reading.

### How to install

Run **yarn add joymap**

### Key features

* Wraps the bare-bones gamepad standard into a flexible and more powerful API
* Organizes inputs and configurations by modules instead of by gamepad
* Modules can be query-based, event-based or Rx-based
* Supports button/stick mapping and remapping
* Supports user-oriented rebinding methods
* Button bindings are set by default to the standard defined by the spec, but all possible inputs are supported
* Can group buttons together (create a 'Jump' button from the A, B, L1 and R1 inputs)
* Can group sticks together (create one Analog stick from the average of L and R)
* Has typescript types

### How to run all the things

* Install all the dependencies with **yarn**
* Run a single example at a time on localhost:9001
  * For the React example, run **yarn react**
  * For the canvas example, run **yarn canvas**
  * For the HTML state log example, run **yarn log**
  * For the "fighting game training mode"-style input display example, run **yarn fighting**
  * For the video stream example, run **yarn video**

### Default export API

Joymap exports an object with a few creation functions:

* createBaseModule
* createQueryModule
* createStreamModule
* createEventModule
* createJoyMap

From among them, the initial point of interaction with the library is **createJoyMap**. It is necessary to use this function since it handles polling the browser's Gamepad API and passes that data along to the different assigned modules. It does not, however, parse or map anything by itself: the modules are the ones that handle that responsibility.

* **createJoyMap(params?: Object) => JoyMap** takes a single optional argument in the form of an object with the following possible values:
  * **onPoll** is a function that will be called at the end of each polling
  * **autoConnect** is a boolean that if true, will connect all newly created Modules with an unused gamepad if present at the moment of module creation
* When **createJoyMap** gets called, it returns an instance of JoyMap that has a bunch of functions:
  * **isSupported() => boolean** returns if gamepads are supported by the browser
  * **start() => void** repeatedly calls **poll()** using requestAnimationFrame
  * **stop() => void** stops calling **poll()**
  * **setOnPoll(onPoll: () => void) => void** modifies internal state of **onPoll**
  * **setAutoConnect(autoConnect: boolean) => void** modifies internal state of **autoConnect**
  * **getGamepads() => Gamepad[]** returns all the available gamepads encountered since the last poll
  * **getModules() => AnyModule[]** returns an array of Modules (see the Modules section for more details)
  * **getUnusedPadIds() => string[]** Returns an array of Gamepad ids that are not currently assigned to a Module
  * **getUnusedPadId() => string | undefined** Same as above but returns only one if present
  * **addModule(module: AnyModule) => void** Adds an instanced module to JoyMap's Module array so that it can receive JoyMap updates
  * **removeModule(module: AnyModule) => void** Removes an instanced module from JoyMap's Module array
  * **clearModules() => void** Removes all modules from JoyMap's Module array
  * **poll() => void** Polls the browser gamepad API and updates all Modules with the data. Can be called manually or indirectly by using **start** and **stop**

The other functions are used to create ...

### Modules

JoyMap's gamepad-accessing API is divided into modules. Each of these implement a basic interface but differ in the way that the input information can be extracted. Three of these modules are implemented for now: QueryModule, StreamModule and EventModule.

The three modules mentioned above work in similar ways, taking an options argument and returning the corresponding module. All of these use the createBaseModule function as a basis to build on top of it.

* **create[type]Module(params?: Object) => module** returns a module and takes a single optional argument in the form of an object with the following possible values:
  * **threshold?: number** is the number between 0 and 1 that is used for all inputs as the minimum value required to be considered as pressed. Default is 0.2
  * **clampThreshold?: boolean** is a boolean that if true, will set all not pressed inputs to 0. Default is true
  * **padId?: string** is the gamepad's Id that will be received on each **update** call. Default is null

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
    
    const AButton = mario.module.getButton('A'); // mario.module may be module1 from above
    if (AButton.pressed && AButton.justChanged && mario.isOnFloor()) {
      mario.jump();
    }

As you can see in the example above, you can create as many modules as you'd like. Each of them will be automatically assigned a gamepad if available (because we passed autoConnect: true) and each of them will stay assigned to that same gamepad even when plugged and unplugged multiple times.

For more a in-depth view on what the modules support and how, do please look at the examples in /examples.

### Naming restrictions

Throughout the library you're invited to name things. Like events, buttons, sticks and mappers. For the sake of making things easier for everybody in the future, these values shall only be alphanumeric. Why? Future-proofing mostly. For example, the event handling system requires this to avoid mixing up names of stuff with possible operators in the future.

### Roadmap

Stuff to do. Keep in mind these bullet points are in no particular order.

* Add an event example or change some of the existing query ones to use events
* Implement rumble
  * This codepen shows how chrome supports it https://codepen.io/anon/pen/yKgYGz
  * Firefox [technically supports it too](https://developer.mozilla.org/es/docs/Web/API/Gamepad/hapticActuators), but I've yet to see it work, even with the gamepad extension flag set to true
* Add a 3d example using [threejs](https://github.com/mrdoob/three.js/) or [whitestorm](https://github.com/WhitestormJS/whitestorm.js)
  * It should have a gamepad config menu for showcasing a more conventional button rebinding UI
  * It should also store in the sessionStorage the module config and on refresh restore it
  * It should also offer a "RESET" button for these module configs
