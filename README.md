# JOYMAP

A Javascript Gamepad browser API wrapper

For the simple cases use [the browser API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API). Otherwise, continue reading

### How to install

Run **yarn add joymap**

### Key features

* Wraps the bare-bones gamepad standard into a flexible and more powerful API
* Organizes inputs and configurations by player instead of by gamepad
* Supports stateful inputs for ease of use: Each input consists of at least { value, pressed, justChanged }
* Supports easy button rebinding methods (stick rebinding is coming)
* Supports simple aliases for ease of use
* Supports functional aggregators that let the programmer combine any input and return any result
* Button bindings are set by default to the XInput standard. All inputs supported by the Gamepad API itself are supported here, they may just require some more elbow grease (meaning: set the bindings yourself somewhere)

### How to run all the things

* Install all the dependencies with **yarn**
* Run a single example at a time on localhost:9000
  * For the React example, run **yarn react**
  * For the canvas example, run **yarn canvas**
  * For the HTML state log example, run **yarn log**
* Build only the minified library to /bin folder with **yarn build**

### Exported API

* **Player** is the Player class itself. Detailed in its own section
* **makeButtonMapper** is a function to create a button mapper function
* **makeStickMapper** is a function to create a stick mapper function
* **Joymap** is the default export and main point of usage. Once instanced, the methods are:
  * **start() => void**: calls **poll()** using requestAnimationFrame
  * **stop() => void**: Stops calling **poll()**
  * **poll() => void**: Polls the gamepad API and updates all Players with the data. Can be called manually if desired
  * **getUnusedGamepadIds() => string[]**: Returns an array of Gamepad ids that are not currently assigned to a Player
  * **setPlayers(jsonString) => void**: [Experimental] Given a serialized string, initialize the players object. Used for saving and later restoring the current player configurations
  * **addPlayer(name) => player**: Instantiate a new Player, add it to joymap.players[name] and return it
  * **removePlayer(name) => void**: Remove a Player by name
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

### What's the deal with that ... polling stuff?

The browser's gamepad API works under the assumption that the programmer is going to be calling **navigator.getGamepads()** each time they want to check on what the gamepads are doing. Due to the nature of gamepads themselves, they tend to change state every femtosecond or so and therefore the programmer needs to poll **navigator.getGamepads()** every time there's a game loop.

To make this as painless as possible, JoyMap offers the methods **joyMap.start()** and **joyMap.stop()** which just start and stop polling the gamepad API using requestAnimationFrame. However, if more precision is needed as to when the polling is done, one can completely ignore both of these methods and directly call **joyMap.poll()** when necessary.

### The Player

* **joyMap.players** is an object that stores the players as you've named them
* **player.buttonAliases**, **player.stickAliases**, **player.aggregators** are all detailed in their own section
* **player.buttons** is an object with all of the buttons specified in the buttonBindings. For each button you have { value, pressed, justChanged }
  * By default, it has these values: { dpadUp, dpadDown, dpadLeft, dpadRight, L1, L2, L3, R1, R2, R3, A, B, X, Y, start, select }
  * **value** is the number given by the gamepad object itself for the specified button. Goes from 0 to 1
  * **pressed** is a boolean that indicates if the value passes the threshold
  * **justChanged** is a boolean  that indicates if pressed has changed since the last time the gamepad was polled (useful for those actions that need to be triggered only when a button is pressed for the first time, like a mario jump)
* **player.sticks** is an object that normally consists of the left and right sticks, **L** and **R** respectively
  * For each stick you have { value, pressed, justChanged, invertX, invertY }. They behave similarly to the buttons but the value itself is not a number but an object { x, y }
  * **x** and **y** are both numbers between -1 and 1
  * **invertX** and **invertY** do what it says on the tin and invert the individual axis of each stick independently
* **player.buttonBindings** is an object that stores each button binding
  * Each button binding is an object of the format { index, mapper }
  * See the binding section
* **player.stickBindings** is an object that stores each stick binding
  * Each stick binding is an object of the format { index, mapper }
  * See the binding section
* **player.parsedGamepad** is a parsed copy of the gamepad object. All inputs are parsed, not just the ones that have bindings
  * It has two properties: { axes, buttons }
  * **axes** is a direct copy of the gamepad.axes array
  * **buttons** is an array of { pressed, justChanged, value }

### Bindings

JoyMap handles the raw gamepad inputs through the buttonBindings and stickBindings. They may look like aliases but they are not constrained by the classical XInput mappings and will allow either the developer or the player to change the bindings to suit their particular gamepad mapping.

The main interactions with these data structures are through the player functions:

* **buttonRebindOnPress(inputName, callback = noop, allowDuplication = false) => void**
  * Once called, JoyMap will ask in each poll for a pressed button and once one is found it will set a binding of the given inputName to that pressed button
  * **inputName** is the name string of the button to be stored in this.buttons
  * **callback** is a callback that will be called (with argument index) when a pressed button is detected and the new input binding is set
  * **allowDuplication** is a flag that when false will swap bindings when one press would trigger more than one binding
* **cancelButtonRebindOnPress() => void**
  * Will cancel the waiting process of **buttonRebindOnPress**
* **clearButtonBindings() => void**
  * Will clear all of the button bindings, leaving player.buttons also empty in the process
* **buttonRebind(inputName, binding) => void**
  * Sets a button binding to inputName.
  * **binding** is an object of the format { index, mapper }
    * **index** is the index number used in the rawGamepad
    * **mapper** is the mapping function of the format **pad => pad.buttons[index]**
* **clearStickBindings() => void**
  * Will clear all of the stick bindings, leaving player.sticks also empty in the process
* **stickRebind(inputName, binding) => void**
  * Sets a stick binding to inputName.
  * **binding** is an object of the format { index, mapper }
    * **index** is the index number used in the rawGamepad
    * **mapper** is the mapping function of the format **(pad, invertX, invertY) => ({ x: pad.axes[index], y: pad.axes[index + 1] })**

### Aliases

Aliases are simple remappings of inputs.

    player2.setAlias('Jump', 'A');
    player2.setAlias('Shoot', ['B', 'X', 'Y']);
    player2.setAlias('Move', 'R');

Their results are stored inside either **player2.buttonAliases** or **player2.stickAliases**, depending on the type of input, as you've named them. 

**player2.buttonAliases.Jump** would contain all of the data found in **player2.buttons.A** but with one value added: **inputs**, a list of originating inputs.

**player2.buttonAliases.Shoot** is either **player2.buttons.B**, **X** or **Y**, depending on which one is currently pressed.

**player2.stickAliases.Move** is again the same thing as before except that we are dealing with the stick data of **player2.sticks.R**. Stick aliases however differ from buttons in the sense that not all data is copied over (if the stick is inverted for example) and if more than one stick name is given, then the resulting alias is the combination of said sticks (Two opposing sticks result in an alias value of { x: 0, y: 0 }).

### Aggregators (name change pending? maybe?)

The idea behind aggregators is to provide a simple way to combine different inputs into a single unrestricted output. To add one, all we need is a name and a callback.

    player3.setAggregator('JumpNShoot', (player, previousValue, rawGamepad) => {
        const { A, B } = player.buttons;
        return A.pressed && B.pressed;
    });

The callback will be given three arguments: the player itself that is currently updating, the previous value returned by the aggregator and the raw gamepad object obtained from **navigator.getGamepads()**. The results are stored in **player.aggregators** as you've named them, just like with aliases, but this time the callback for each aggregator is the one that decides what is being stored.

### Coming soon(ish):

* Implement stickRebindOnPress
* Include the ability to add/remove players from the canvas example
* Add a 3d example using threejs
* Add a gamepad config menu example
  * Store in the sessionStorage the config of the player and on refresh restore it using joymap.setPlayers 
* Might want to find a better name than "Aggregators"
* Add an event system? Maybe?
  * The ability to handle inputs as events
  * player.addEvent('A.justPressed', ()=> console.log('jump!'))
  * player.addEvent('B', ()=> console.log('run!'))
  * Also should handle connecting/disconnecting gamepads
* Controller types
  * Add support for identifying types of controllers (need to wait for standardization between browsers)
  * Will be used for showing the right button prompts in-game
  * Will be used for mapping the right buttons for the main gamepads and browsers (though its not clear yet if this is even necessary)
* Rumble support 
  * Check later for real support. All we have right now is for mobile devices
  * https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API
  * https://www.w3.org/TR/vibration/
