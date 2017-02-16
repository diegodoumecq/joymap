**[How to install](#how-to-install)** |
**[Key features](#key-features)** |
**[How to run all the things](#how-to-run-all-the-things)** |
**[Technologies](#technologies)** |
**[Exported API](#exported-api)** |
**[Simple example of usage](#simple-example-of-usage)** |
**[Why use polling instead of events?](#why-use-polling-instead-of-events)** |
**[The Player's API](#the-players-api)** |
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
* Organizes inputs and configurations by player instead of by gamepad
* Supports stateful inputs for ease of use: Each input consists of at least { value, pressed, justChanged }
* Supports easy button/stick binding and rebinding methods
* Supports functional mappers that let the programmer combine any input and return any result
* Button bindings are set by default to the XInput standard. All inputs supported by the Gamepad API itself are supported, they may just require some more elbow grease (meaning: set the bindings yourself somewhere)

### How to run all the things

* Install all the dependencies with **yarn**
* Run a single example at a time on localhost:9000
  * For the React example, run **yarn react**
  * For the canvas example, run **yarn canvas**
  * For the HTML state log example, run **yarn log**
* Build only the minified library to /bin folder with **yarn build**

### Technologies

JoyMap is developed using [webpack 2](https://webpack.js.org/) for the dev environment/bundling and [Babel](https://babeljs.io/) as a transpiler to support ES6 ([and beyond](https://babeljs.io/docs/plugins/preset-es2017/)) as well as [flow type handling](https://flowtype.org/).

There are three examples of usage, each of them showcasing the different ways to interact and use JoyMap while using different technologies.

### Exported API

* **createJoyMap(params?: {}) => joyMapObject** is the default export function and main point of usage.
* It takes a single optional argument in the form of an object with the following possible values:
  * **threshold** is a number bewteen 0 and 1 that is used for all inputs as the minimum value required to be considered as pressed
  * **clampThreshold** is a boolean that if true, will set all not pressed inputs to 0
  * **onPoll** is a function that will be called at the end of each polling
  * **autoConnect** is a boolean that if true, will connect all newly created Players with an unused gamepad if present at the moment of player creation
* When **createJoyMap** gets called, it returns an object that has a bunch of functions:
  * **isSupported() => boolean** returns if gamepads are supported by the browser
  * **getPlayerConfigs() => string** Returns a serialized string representing an array of whatever each **player.getConfig()** returns; used for saving the current player configs for later
  * **setPlayerConfigs(jsonString: string) => void** calls **clearPlayers()** first and then creates a player for each config given in the serialized string's main array; this is intended to be used a restoration mechanism, for example **getPlayerConfigs** could be used to store the current player config in localStorage and later on restoring it with **setPlayerConfigs**
  * **start() => void** repeatedly calls **poll()** using requestAnimationFrame
  * **stop() => void** stops calling **poll()**
  * **setThreshold(threshold: number) => void** modifies the **threshold**
  * **setClampThreshold(clampThreshold: boolean) => void** modifies the **clampThreshold**
  * **setOnPoll(onPoll: Function) => void** modifies **onPoll**
  * **setAutoConnect(autoConnect: boolean) => void** modifies **autoConnect**
  * **getGamepads() => Gamepad[]** returns all the available gamepads encountered since the last poll
  * **getPlayers() => IPlayer[]** returns an array of Players (see the Player section for more details)
  * **getUnusedPadIds() => string[]** Returns an array of Gamepad ids that are not currently assigned to a Player
  * **getUnusedPadId() => string | null** Same as above but returns only one if present
  * **addPlayer(padId?: ?string) => IPlayer** Creates a new Player, adds it to an internal array and returns it
  * **removePlayer(player: IPlayer) => void** Removes a Player from JoyMap's Player array
  * **clearPlayers() => void** Remove all players from JoyMap's array
  * **poll() => void** Polls the browser gamepad API and updates all Players with the data. Can be called manually or by using **start** and **stop**

### Simple example of usage

    // Pretend there's a declared stepFunction that does stuff on each step

    import createJoyMap from 'joymap';

    const joyMap = createJoyMap({
        threshold: 0.3,
        clampThreshold: true,
        onPoll: stepFunction,
        autoConnect: true
    });
    const player1 = joyMap.addPlayer();
    const player2 = joyMap.addPlayer();
    const player3 = joyMap.addPlayer();
    joyMap.start();
    
    // ... later on in another file, probably a mario-handling one:
    
    const A = player1.getButtons('A');
    if (A.pressed && A.justChanged) {
        mario.jump();
    }

As you can see in the example above, you can create as many players as you'd like. Each of them will be automatically assigned a gamepad if available and each of them will stay assigned with that same gamepad even when plugged and unplugged multiple times.

For more a in-depth view on what the library supports and how, do please look at the examples in /examples.

### Why use polling instead of events?

The browser gamepad API works under the assumption that the programmer is going to be calling **navigator.getGamepads()** each time they want to check on what the gamepads are doing. It is by no means a robust solution and will in fact not notice the player pressing a button if they press and release fast enough between **navigator.getGamepads()** calls. Unfortunately, [there's no current support for gamepad input events](https://github.com/w3c/gamepad/issues/4), there's just two events for connecting and disconnecting the gamepad itself.

Being stuck with polling, JoyMap offers the methods **joyMap.start()** and **joyMap.stop()** which just start and stop polling the browser gamepad API using **requestAnimationFrame()**. However, if more precision is needed as to when the polling is done, one can completely ignore both of these methods and directly call **joyMap.poll()** when one decides that such a thing would be nice and convenient.

### The Player's API

Note: All named types like IButtonState and IListenParams are declared in the types.js file.

* **getPadId() => ?string** Returns the gamepad id assigned to Player, may be connected or not
* **isConnected() => boolean** Returns if the Player has assigned to it a currently connected gamepad
* **disconnect() => void** Sets the Player as not connected
* **connect(padId?: string) => void** Sets the Player as connected and assigns a new gamepad id if given one
* **getConfig() => string** Returns a serialized version of the internal structures that represent buttons, sticks, name, threshold and clampThreshold. Notice that mappers are missing from this since they are functions and there's no easy, clean way to store functions. Gamepad assignement is also missing but that's more to do with not wanting to store information that will not be consistent between play sessions (different browsers give different Ids for the same gamepad, for instance)
* **setConfig(serializedString: string) => void** Parses the given string and assigns the player's internal state to whatever the parse results in
* **getButtons(...names: string[]) => IButtonState | IButtonStates** Returns button objects depending on the format the arguments take
  * Given only one button name as argument, the returned object will be { value, pressed, justChanged }
  * Given more than one button name as arguments, the returned object will have the button names as keys and their values will be the same type of object already mentioned, meaning { value, pressed, justChanged }
  * Given no arguments, the returned value will be an object with ALL the button names as keys and their values being the already mentioned objects
  * So player.getButtons('A') will return { value, pressed, justChanged}, but player.getButtons('A', 'B') will return { A: { value, ... }, B: { value, ... } }
* **getSticks(...names: string[]) => IStickState | IStickStates** Functions the exact same way as getButtons save for the object format being { value, pressed, justChanged, inverts }
  * In this case, **value** is an array of numbers, each one representing an axis of the stick. These numbers also go from -1 to 1
* **getMappers(...names: string[]) => IMapperState | IMapperStates** Again, functions the exact same way as getButtons except that mappers don't have a set object format in particular for each mapper result
* **getButtonIndexes(...inputNames: string[]) => IButtonIndexes** Returns the combined indexes of the given button names, even if given only one name
  * These indexes are the index number that a given button is bound to. For example, an Xbox360 X button's index is typically 0, so it is the first value found in the browser's Gamepad buttons array
  * Combines very well with **setButton**
* **getStickIndexes(...inputNames: string[]) => IStickIndexes** Returns the combined indexes of the given stick names, again, same thing as getButtonIndexes but applied to sticks and their axes
* **setButton(inputName: string, indexes: IButtonIndex | IButtonIndexes) => void** Sets a button name to the given index / indexes. This function does not care about duplication and can even take multiple indexes
 * When one single button is assigned to multiple indexes, the resulting value is the biggest of the specified indexes. The resulting object will still be { value, pressed, justChanged }
* **setStick(inputName: string, indexes: IStickIndex | IStickIndexes, inverts?: IStickInverts) => void** Sets a stick name to the given index / indexes. Same thing as **setButton** except it also takes the optional argument **inverts**. This argument is an array of booleans that will be assigned to the resulting stick, each bool representing if the corresponding axis should be inverted
* **setMapper(mapperName: string, callback: IMapper) => void** Sets a mapper name to the given callback function. The result given by getMapper depends entirely on what this callback returns
  * This callback receives a reference to the player as the only argument
  * Note: do take into account that this callback will always be called by **getMapper** and at no other time
* **invertSticks(inverts: IStickInverts, ...inputNames: string[]) => void** Sets an array of booleans as the inverts property of the given stick names
* **swapButtons(btn1: string, btn2: string) => void** Swaps two buttons' indexes
* **swapSticks(btn1: string, btn2: string, includeInverts?: boolean) => void** Swaps two sticks' indexes, and if **includeInverts** is true, also swaps the inverts of each stick
* **removeMapper(mapperName: string) => void** Removes a single mapper
* **clearMappers() => void** Clears all the mappers
* **update(gamepad: Gamepad) => void** A function called on each poll by JoyMap, updates internal structures and checks for the status of **listenButton** and **listenAxis**
* **cancelListen() => void** Will cancel the waiting process of **listenButton** or **listenAxis**
  * Note: You can only wait for buttons or for axes, never both at the same time
* **listenButton(callback: Function, quantity?: number, params?: IListenParams) => void** Once called, JoyMap will ask in each poll for a **quantity** of pressed buttons and once such a thing is found given the criteria specified by the options, it will call callback with the activated input indexes as arguments
  * params: { waitFor = [1, 'polls'], consecutive = false, allowOffset = true }
  * Note: The above mentioned "activated input index" is an index corresponding to the raw gamepad.buttons array
  * **callback(...indexes)** Gets called when the player fulfills the specified criteria below
  * **quantity** The number of buttons that need to be pressed at the same time
  * **options.waitFor** An array consisting of an amount and the type that amount corresponds to. The default [10, 'polls'] will trigger the callback only after 10 consecutive polls are made that fulfill the other criteria options and quantity
  * **options.consecutive** Boolean that specifies if only consecutive indexes are allowed (when quantity > 1, useful mostly for axis and not buttons)
  * **options.allowOffset** Boolean that specifies if the first index returned should comply with being divisible by quantity (again, useful mostly for axis)
* **listenAxis(callback: Function, quantity?: number, params?: IListenParams) => void** Functions the same way as **listenButton** except with a different default value for waitFor
  * params: { waitFor = [100, 'ms'], consecutive = false, allowOffset = true }
  * Note: Given that we have no true way of assuming what indexes correspond to which stick, under normal circumstances the player will only trigger the callback if the stick is pushed at an angle, activating both axis at the same time. Pushing the stick to the left, for example, would not trigger the callback
* **buttonBindOnPress(inputName: string, callback: Function, allowDuplication?: boolean) => void** A helper function that uses **listenButton** with the default options and sets the correct bindings for you
  * **inputName** is the name string of the button to be stored in this.buttons
  * **callback** is a callback that will be called (with argument index) when a pressed button is detected and the new input binding is set
  * **allowDuplication** is a flag that when false will swap bindings when one press would trigger more than one binding
* **stickBindOnPress(inputName: string, callback: Function, allowDuplication?: boolean) => void** Functions the same way as **buttonBindOnPress** except the callback will receive two indexes instead of just one due to the default settings of **listenAxis**
* **destroy() => void** Clears all the internal data structures

### Naming restrictions

Throughout the library you're invited to name stuff. Like players, buttons, sticks and mappers. For the sake of making things easier for everybody in the future, these values shall only be alphanumeric. Why? Well, the event handling system that is not developed yet would require a strict naming convention to avoid mixing up names of stuff with possible operators.

### Advanced example of usage

Taken from the StateLog example:

    // Pretend there's a declared stepFunction that does stuff on each step
    import createJoyMap from 'joymap';
    
    const joyMap = createJoyMap({
        threshold: 0.3,
        clampThreshold: true,
        onPoll: stepFunction,
        autoConnect: true
    });
    
    const jo = joyMap.addPlayer();
    
    jo.setButton('Jump', jo.getButtonIndexes('A', 'X', 'Y', 'L2', 'R2'));
    jo.setButton('Shoot', jo.getButtonIndexes('B'));
    jo.setButton('LookUp', jo.getButtonIndexes('dpadUp'));
    jo.setButton('LookDown', jo.getButtonIndexes('dpadDown'));
    jo.setButton('LookLeft', jo.getButtonIndexes('dpadLeft'));
    jo.setButton('LookRight', jo.getButtonIndexes('dpadRight'));
    jo.setButton('StickAverage', jo.getStickIndexes('L', 'R'));
    
    jo.setMapper('Point', ({ player }) => player.getSticks('R').pressed);

### Roadmap

Stuff to do. Keep in mind these bullet points are in no particular order.

* Add a 3d example using [threejs](https://github.com/mrdoob/three.js/) or [whitestorm](https://github.com/WhitestormJS/whitestorm.js)
  * It should have a gamepad config menu for showcasing a more conventional button rebinding UI
  * It should also store in the sessionStorage the player config and on refresh restore it using joymap.setPlayers
  * It should also offer a "RESET" button for these player configs
* Consider the use of web-workers and whether or not they would be worth it in this context
* Implement rumble when it gets supported
  * [We do have vibration support but only for mobile devices](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API)
  * There's an [open issue](https://github.com/w3c/gamepad/issues/19) about this
* Add simple event handling
  * joyMap.onConnect(eventHandler) would be triggered by connecting a gamepad
  * joyMap.onDisconnect(eventHandler) would be triggered by disconnecting a gamepad
  * On both of those, **eventHandler** is a function that would receive the raw gamepad as an argument
  * player.addEvent(eventName: string, eventHandler: (event) => void) would be used for input handling
  * **eventName** could be either 'button', 'axis' or any input name under player.buttons or player.sticks or any alias
  * **eventName** can also specify if the event should only be triggered when pressed, when not pressed, when justChanged and when not justChanged
  * **eventHandler** is a function that will be called with an event object that consists of at least { value, pressed, justChanged }
  * **eventHandler** will also receive index in the event object when listening for the 'button' or 'axis' events
  * player.addEvent('A', eventHandler) will trigger every time the A button is pressed
  * player.addEvent('!A', eventHandler) will trigger every time the A button is not pressed
  * player.addEvent('A.!justChanged', eventHandler) will trigger when the A button is pressed but not justChanged
  * player.addEvent('button.justChanged', eventHandler) will trigger when any button is pressed and justChanged
  * player.addEvent('!button', eventHandler) will trigger when no button is pressed. Consequently the eventHandler will receive index as -1 as part of the event object
* Once some event handling is added, support [observable streams](https://github.com/Reactive-Extensions/RxJS)
* Support multiple inputs on a single event handler
  * This can get out of hand pretty quickly, but it certainly would be pretty neat
  * This would improve **player.addEvent** by allowing the syntax player.addEvent('A + B') for combination of inputs
  * player.addEvent('A B') would be triggered by pressing A, releasing it and then pressing B
  * Need to somehow figure out a timing configuration for the above example
  * player.addEvent('A + !B') would only trigger if A is pressed and B is not pressed
