# JOYMAP

A Javascript Gamepad browser API wrapper

For the simple cases use [the browser API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API). Otherwise, continue reading.

### How to install

Run **yarn add joymap**

### Key features

* Wraps the bare-bones gamepad standard into a flexible and more powerful API
* Organizes inputs and configurations by player instead of by gamepad
* Supports stateful inputs for ease of use: Each input consists of at least { value, pressed, justChanged }
* Supports easy button rebinding methods (stick rebinding is coming)
* Supports simple aliases for ease of use
* Supports functional aggregators that let the programmer combine any input and return any result
* Button bindings are set by default to the XInput standard. All inputs supported by the Gamepad API itself are supported, they may just require some more elbow grease (meaning: set the bindings yourself somewhere)

### How to run all the things

* Install all the dependencies with **yarn**
* Run a single example at a time on localhost:9000
  * For the React example, run **yarn react**
  * For the canvas example, run **yarn canvas**
  * For the HTML state log example, run **yarn log**
* Build only the minified library to /bin folder with **yarn build**

### Exported API

* **Player** is the Player class itself. Detailed in its own section
* **makeButtonBinding(index)** is a function to create a button binding function
* **makeStickBinding(...indexes)** is a function to create a stick binding function
* **Joymap** is the default export and main point of usage. Once instanced, the methods are:
  * **start() => void**: calls **poll()** using requestAnimationFrame
  * **stop() => void**: Stops calling **poll()**
  * **poll() => void**: Polls the browser gamepad API and updates all Players with the data. Can be called manually if desired
  * **getUnusedGamepadIds() => string[]**: Returns an array of Gamepad ids that are not currently assigned to a Player
  * **setPlayers(jsonString) => void**: [Experimental] Given a serialized string, initialize the players object. Used for saving and later restoring the current player configurations
  * **addPlayer(name) => player**: Instantiate a new Player, add it to joymap.players[name] and return it
  * **removePlayer(player) => void**: Remove a Player
  * **cleanPlayers() => void**: Remove all the players

### Initialization and usage

JoyMap is not a singleton and so, must be initialized. You can pass three optional parameters
* **threshold** is the number between 0 and 1 that any given input must surpass to qualify as **pressed**
* **clampThreshold** is a boolean that determines if all inputs should be set to 0 if they don't qualify as **pressed**
* **onPoll** is the callback that will be called once after each poll of the gamepad object is finished

So, for example:

    /... somewhere up here there's a declared stepFunction that does stuff on each step/

    const joyMap = new JoyMap({ threshold: 0.5, clampThreshold: true, onPoll: stepFunction });
    const player1 = joyMap.addPlayer('player1');
    const player2 = joyMap.addPlayer('player2');
    const player3 = joyMap.addPlayer('player3');
    joyMap.start();
    
    /... later on in another file, probably a player-handling one: /

    if (player1.buttons.A.pressed && player1.buttons.A.justChanged) {
        this.jump();
    }

As you can see in the example above, you can create as many players as you'd like. Each of them will be automatically assigned a gamepad if available and each of them will stay assigned with that same gamepad even when plugged and unplugged multiple times.

For more a in-depth view on what the library supports and how, do please look at the examples in /examples.

### Why use polling instead of events?

The browser gamepad API works under the assumption that the programmer is going to be calling **navigator.getGamepads()** each time they want to check on what the gamepads are doing. It is by no means a robust solution and will in fact not notice the player pressing a button if they press and release fast enough between **navigator.getGamepads()** calls. Unfortunately, [there's no current support for gamepad input events](https://github.com/w3c/gamepad/issues/4), there's just two events for connecting and disconnecting the gamepad itself.

Being stuck with polling, JoyMap offers the methods **joyMap.start()** and **joyMap.stop()** which just start and stop polling the browser gamepad API using **requestAnimationFrame()**. However, if more precision is needed as to when the polling is done, one can completely ignore both of these methods and directly call **joyMap.poll()** when one decides that such a thing would be nice and convenient.

### The Player and their data structures

* **joyMap.players** is an object that stores the players as you've named them
* **player.buttonAliases**, **player.stickAliases**, **player.aggregators** are all detailed in their own section
* **player.buttons** is an object with all of the buttons specified in the buttonBindings. For each button you have { value, pressed, justChanged }
  * By default, it has these values: { dpadUp, dpadDown, dpadLeft, dpadRight, L1, L2, L3, R1, R2, R3, A, B, X, Y, start, select }
  * **value** is the number given by the gamepad object itself for the specified button. Goes from 0 to 1
  * **pressed** is a boolean that indicates if the value passes the threshold
  * **justChanged** is a boolean  that indicates if pressed has changed since the last time the gamepad was polled (useful for those actions that need to be triggered only when a button is pressed for the first time, like a mario jump)
* **player.sticks** is an object that normally consists of the left and right sticks, **L** and **R** respectively
  * For each stick you have { value, pressed, justChanged, inverts }. They behave similarly to the buttons but the value itself is not a number but an array of numbers, the first number corresponding to the x axis typically and the second with the y axis. There is no restriction on the amount of axis per stick but the default is only 2, which is 99.9% of the use cases
  * **value** Is an array of numbers between -1 and 1
  * **inverts** Is an array of booleans that when true will invert the axis it corresponds to
  * For example, if inverts is [true, false], then the x axis will be inverted but the y axis will not
* **player.buttonBindings** is an object that stores each button binding
  * Each button binding is an object of the format { index, mapper }
  * See the binding section
* **player.stickBindings** is an object that stores each stick binding
  * Each stick binding is an object of the format { indexes, mapper }
  * See the binding section
* **player.parsedGamepad** is a parsed copy of the gamepad object. All inputs are parsed, not just the ones that have bindings
  * It has two properties: { axes, buttons }
  * **axes** is a direct copy of the gamepad.axes array
  * **buttons** is an array of objects { pressed, justChanged, value }

### Bindings

JoyMap handles the raw gamepad inputs through the buttonBindings and stickBindings. They may look like aliases but they are not constrained by the classical XInput mappings and will allow either the developer or the player to change the bindings to suit their particular gamepad.

The main interactions with these data structures are through these player functions:

* **listenButton(callback, quantity = 1, options: { waitFor = [1, 'polls'], consecutive = false, allowOffset = true }) => void**
  * Once called, JoyMap will ask in each poll for a **quantity** of pressed buttons and once such a thing is found given the criteria specified by the options, it will call callback with the activated input indexes as arguments.
  * Note: The above mentioned "activated input index" is an index corresponding to the raw gamepad.buttons array
  * **callback(...indexes)** Gets called when the player fulfills the specified criteria below
  * **quantity** The number of buttons that need to be pressed at the same time
  * **options.waitFor** An array consisting of an amount and the type that amount corresponds to. The default [10, 'polls'] will trigger the callback only after 10 consecutive polls are made that fulfill the other criteria options and quantity
  * **options.consecutive** Boolean that specifies if only consecutive indexes are allowed (when quantity > 1, useful mostly for axis and not buttons)
  * **options.allowOffset** Boolean that specifies if the first index returned should comply with being divisible by quantity (again, useful mostly for axis)
* **listenAxis(callback, quantity = 1, options: { waitFor = [100, 'ms'], consecutive = false, allowOffset = true }) => void**
  * Functions the same way as **listenButton** except with a different default value for waitFor
  * Note: Given that we have no true way of assuming what indexes correspond to which stick, under normal circumstances the player will only trigger the callback if the stick is pushed at an angle, activating both axis at the same time. Pushing the stick to the left, for example, would not trigger the callback.
* **buttonRebindOnPress(inputName, callback = noop, allowDuplication = false) => void**
  * A helper function that uses **listenButton** with the default options and sets the correct bindings for you
  * **inputName** is the name string of the button to be stored in this.buttons
  * **callback** is a callback that will be called (with argument index) when a pressed button is detected and the new input binding is set
  * **allowDuplication** is a flag that when false will swap bindings when one press would trigger more than one binding
* **stickRebindOnPress(inputName, callback = noop, allowDuplication = false) => void**
  * Functions the same way as **buttonRebindOnPress** except the callback will receive two indexes instead of just one due to the default settings of **listenAxis**
* **cancelListen() => void**
  * Will cancel the waiting process of **listenButton** or **listenAxis**
  * Note: You can only wait for buttons or for axes, never both at the same time
* **clearButtonBindings() => void**
  * Will clear all of the button bindings, leaving player.buttons as an empty object
* **clearStickBindings() => void**
  * Will clear all of the stick bindings, leaving player.sticks as an empty object
* **buttonRebind(inputName, binding) => void**
  * Sets a button binding to inputName
  * **binding** is an object of the format { index, mapper }
    * **index** is the index number used in the rawGamepad
    * **mapper** is the mapping function of the format **pad => pad.buttons[index]**
* **stickRebind(inputName, binding) => void**
  * Sets a stick binding to inputName
  * **binding** is an object of the format { indexes, mapper }
    * **indexes** is an array of the index numbers used in the rawGamepad
    * **mapper** is the mapping function of the format **(pad, inverts) => [pad.axes[index1], pad.axes[index2]]**

### Aliases

Aliases are simple remappings of inputs. They take one or more binding names and associate them to an alias name.

    player2.setAlias('Jump', 'A');
    player2.setAlias('Shoot', ['B', 'X', 'Y']);
    player2.setAlias('Move', 'R');

Their results are stored inside either **player2.buttonAliases** or **player2.stickAliases**, depending on the type of input, as you've named them. 

**player2.buttonAliases.Jump** would contain all of the data found in **player2.buttons.A** but with one value added: **inputs**, a list of originating inputs.

**player2.buttonAliases.Shoot** is either **player2.buttons.B**, **X** or **Y**, depending on which one is currently pressed the most.

**player2.stickAliases.Move** is again the same thing as before except that we are dealing with the stick data of **player2.sticks.R**. Stick aliases however differ from buttons in the sense that not all data is copied over (if the stick is inverted) and if more than one stick name is given, then the resulting alias is the combination of said sticks (Two opposing sticks result in an alias value of [0, 0]).

### Aggregators

The idea behind aggregators is to provide a simple way to combine different inputs into a single unrestricted output. To add one, all we need is a name and a callback.

    player3.setAggregator('JumpNShoot', (player, previousValue, rawGamepad) => {
        const { A, B } = player.buttons;
        return A.pressed && B.pressed;
    });

The callback will be given three arguments: the player itself, the previous value returned by the aggregator and the raw gamepad object obtained from **navigator.getGamepads()**. The results are stored in **player.aggregators** as you've named them, just like with aliases, but this time the callback for each aggregator is the one that decides what is being stored.

### Naming restrictions

Throughout the library you're invited to name stuff. Like players, bindings, aliases and aggregators. For the sake of making things easier for everybody in the future, these values shall only be alphanumeric. Why? Well, the event handling system that is not developed yet would require a strict naming convention to avoid mixing up names of stuff with possible operators.

### Roadmap

Stuff to do. Keep in mind these bullet points are in no particular order.

* Add a 3d example using [threejs](https://github.com/mrdoob/three.js/) or [whitestorm](https://github.com/WhitestormJS/whitestorm.js)
  * It should have a gamepad config menu for showcasing a more conventional button rebinding UI
  * It should also store in the sessionStorage the player config and on refresh restore it using joymap.setPlayers
  * It should also offer a "RESET" button for these player configs
* Implement a different way to export flow types since flow comments seem to be on the way out and can't handle class properties
  * [There seems to be kind of a consensus](https://github.com/facebook/flow/issues/1996) at least
* Implement most of this library inside a web-worker [when/if that becomes a possibility](https://github.com/w3c/gamepad/issues/37)
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
* Support multiple inputs on a single event handler
  * This can get out of hand pretty quickly, but it certainly would be pretty neat
  * This would improve **player.addEvent** by allowing the syntax player.addEvent('A + B') for combination of inputs
  * player.addEvent('A B') would be triggered by pressing A, releasing it and then pressing B
  * Need to somehow figure out a timing configuration for the above example
  * player.addEvent('A + !B') would only trigger if A is pressed and B is not pressed
