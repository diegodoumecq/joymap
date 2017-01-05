# JOYMAP

A Javascript Gamepad API wrapper of the much needed but seriously underpowered browser Gamepad API (https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API)

### How to install

Run **yarn add joymap**

### Key features

* Wraps the ever-changing gamepad standard into a flexible and more useful API
* Based around player configuration, it organizes input by player rather than by gamepad
* Supports stateful inputs for ease of use: Each input consists of { value, pressed, justChanged }
* Supports button remapping by the user
* Supports functional aggregators that let the programmer combine any input and return any result
* Button mappings are based around the XInput standard, just because it is the only one that works without strange behaviors across all browsers

### How to run all the things

* Install all the dependencies with **yarn**
* Run a single example at a time on localhost:9000
  * For the React example, run **yarn react**
  * For the canvas example, run **yarn canvas**
  * For the HTML state log example, run **yarn log**
* Build only the minified library to /bin folder with **yarn build**

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

### Exported API

* **Joymap** default export, the library itself and main point of usage
* **Player** the Player class itself
* **makeButtonMapper** function to create a button mapper function

### What's the deal with that ... polling stuff?

The browser's gamepad API works under the assumption that the programmer is going to be calling **navigator.getGamepads()** each time they want to check on what the gamepads are doing. Due to the nature of gamepads themselves, they tend to change state every femtosecond or so and therefore the programmer needs to poll **navigator.getGamepads()** every time there's a game loop.

To make this as painless as possible, JoyMap offers the methods **joyMap.start()** and **joyMap.stop()** which just start and stop polling the gamepad API using requestAnimationFrame. However, if more precision is needed as to when the polling is done, one can completely ignore both of these methods and directly call **joyMap.poll()** when necessary.

### Data structures

* **joyMap.players** is an object that stores the players themselves as you've named them. In the initialization example **joyMap.players** will be an object with three values: player1, player2 and player3
* **player.buttons** is an object with all of the inputs except for the analog sticks. For each input you have { value, pressed, justChanged }
  * **value** is the value given by the gamepad object itself for the specified button
  * **pressed** indicates if the value passes the threshold
  * **justChanged** indicates if pressed has changed since the last time we polled the gamepad (useful for those actions that need to be triggered only when a button is pressed for the first time, like a mario jump)
  * **player.buttons** has these inputs: { dpadUp, dpadDown, dpadLeft, dpadRight, L1, L2, L3, R1, R2, R3, A, B, X, Y, start, select }
* **player.sticks** is an object that normally consists of the left and right sticks, **L** and **R** respectively
  * For each stick you have { value, pressed, justChanged, invertX, invertY }. They behave similarly to the buttons but the value itself is not a number but an object { x, y }
  * **x** and **y** are both numbers between -1 and 1
  * **invertX** and **invertY** do what it says on the tin and invert the individual axis of each stick independently
* **player.buttonBindings**
* **player.stickBindings**
* **player.parsedGamepad**
* **player.buttonAliases**
* **player.stickAliases**

### Bindings

JoyMap handles the raw gamepad inputs through the buttonBindings and stickBindings. They may look like aliases but they are not constrained by the classical XInput mappings and will allow either the developer or the player to change the bindings to suit their particular gamepad mapping.

The main interactions with these data structures are through the functions:

* **buttonRebindOnPress(inputName, callback = noop, allowDuplication = false)**
  * Once called, JoyMap waits for the next button to be pressed and sets the input named to that press
  * **inputName** is the name of the button to be stored in this.buttons
  * **callback** is a callback that will be called (with argument index) when the press is detected and the new input binding is set
  * **allowDuplication** is a flag that when false will swap bindings when one press would be set to multiple inputNames
* **cancelButtonRebindOnPress()**
  * Will cancel the waiting process of **buttonRebindOnPress**
  * Receives nothing, returns nothing
* **buttonRebind(inputName, binding)**
  * Sets a button binding to inputName.
  * **binding** is an object of the format { index, mapper }
    * **index** is the index number used in the rawGamepad
    * **mapper** is the mapping function of the format **pad => pad.buttons[index]**
* **stickRebind(inputName, binding)**
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

1) Implement rebinding of sticks
  
  * Right now it is assumed that the user will always use a controller with XInput, but the web standard allows for any kind of weird stuff as long as it consists of buttons and sticks (a flight simulator cockpit for example). It is up to the dev to support that strange stuff and this library needs to make it easier.

2) Implement the listen function in Player for allowing the user to rebind a button to whatever is pressed next

  * Add that to the examples

3) Include the ability to add/remove players from the react example

4) Add a 3d example using threejs

5) Might want to find a better name than "Aggregators"

6) Add an event system? Maybe?

  * The ability to handle inputs as events
  * player.addEvent('A.justPressed', ()=> console.log('jump!'))
  * player.addEvent('B', ()=> console.log('run!'))
  * Also should handle connecting/disconnecting gamepads

7) Controller types

  * Add support for identifying types of controllers (need to wait for standardization between browsers)
  * Will be used for showing the right button prompts in-game
  * Will be used for mapping the right buttons for the main gamepads and browsers (though its not clear yet if this is even necessary)

8) Rumble support 

  * Check later for real support. All we have right now is for mobile devices
  * https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API
  * https://www.w3.org/TR/vibration/
