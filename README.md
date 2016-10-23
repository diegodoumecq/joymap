# JOYMAP

A Javascript Gamepad API wrapper of the much needed but seriously underpowered browser Gamepad API (https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API)

### Key features

* Wraps the ever-changing gamepad standard into a flexible and more useful API
* Based around player configuration, it organizes input by player rather than by gamepad
* Supports stateful inputs for ease of use: Each input consists of { value, pressed, justChanged }
* Supports button remapping by the user
* Supports functional aggregators that let the programmer combine any input and return any result
* Button mappings are based around the XInput standard, just because it is the only one that works without strange behaviors across all browsers

### How to

* Install all the dependencies with **npm install** or **yarn**
* Run all the examples on localhost:9000 with **npm run dev**
* Build only the minified library to /bin folder with **npm run build**
* Inside /src/examples there are ... examples. Might want to take a look there first
* Inside /src/lib there's every single file of the library itself. All two of them

### Initialization and usage

JoyMap is not a singleton and so, must be initialized. You can pass three optional parameters
* **threshold** is the number between 0 and 1 that any given input must surpass to qualify as **pressed**
* **clampThreshold** is a boolean that determines if all inputs should be set to 0 if they don't qualify as **pressed**
* **onPoll** is the callback that will be called once after each poll of the gamepad object is finished

So, for example:

    /...declares a stepFunction that does stuff on each step/
    const joyMap = new JoyMap({ threshold: 0.5, clampThreshold: true, onPoll: stepFunction });
    const player1 = joyMap.addPlayer('player1');
    const player2 = joyMap.addPlayer('player2');
    const player3 = joyMap.addPlayer('player3');
    joyMap.start();
    
    /... later on in another file, probably a player-handling one/
    if (player1.buttons.A.pressed && player1.buttons.A.justChanged) {
        this.jump();
    }

As you can see in the example above, you can create as many players as you'd like. Each of them will be automatically assigned a gamepad if available and each of them will stay assigned with that same gamepad even when plugged and unplugged multiple times.

Once **joyMap.start()** is called, the library will start polling navigator.getGamepads on each window.requestAnimationFrame. You can even avoid the start function entirely and call **joyMap.poll()** yourself if you need to control exactly when the polling happens.

For more a in-depth view on what the library supports and how, do please look at the examples in src/examples.

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
* **player.sticks** is an object that consists of the left and right sticks, **L** and **R** respectively
  * For each stick you have { value, pressed, justChanged, invertX, invertY }. They behave similarly to the buttons but the value itself is not a number but an object { x, y }
  * **x** and **y** are both numbers between -1 and 1
  * **invertX** and **invertY** do what it says on the tin and invert the individual axis of each stick independently

### Aliases

Aliases are simple remappings of inputs.

    player2.setAlias('Jump', 'A');
    player2.setAlias('Shoot', 'B');

Their results are stored inside player.aliases as you've named them. 

**player2.aliases.Jump** would contain all of the data found in **player2.buttons.A** but with two values added { name, isButton }; **name** being the name of the originating input and the boolean **isButton** specifying the type of said input.

### Aggregators (name change pending)

The idea behind aggregators is to provide a simple way to combine different inputs into a single unrestricted output. To add one, all we need is a name and a callback.

    player3.setAggregator('JumpNShoot', (player, previousValue, rawGamepad) => {
        const { A, B } = player.buttons;
        return A.pressed && B.pressed;
    });

The callback will be given three arguments: the player itself that is currently updating, the previous value returned by the aggregator and the raw gamepad object obtained from **navigator.getGamepads()**. The results are stored in **player.aggregators** as you've named them, just like with aliases, but this time the callback for each aggregator is the one that decides what is being stored.

### Coming soon(ish):

1) Implement the listen function in Player for allowing the user to rebind a button to whatever is pressed next

  * Add that to the examples

2) Include the ablity to add/remove players from the html example

3) Gamepad rebinding

  * Add a few basic functions to handle a player changing controllers
  * Add a listen function to joymap for allowing the user to use the next gamepad to press anything (or a specified button)

4) Add a 3d example using threejs

5) Add an event system

  * The ability to handle inputs as events
  * player.addEvent('A.justPressed', () => console.log('jump!'))
  * player.addEvent('B', () => console.log('run!'))
  * Also should handle connecting/disconnecting gamepads

6) Might want to find a better name than "Aggregators"

7) Controller types

  * Add support for identifying types of controllers (need to wait for standarization between browsers)
  * Will be used for showing the right button prompts in-game
  * Will be used for mapping the right buttons for the main gamepads and browsers (though its not clear yet if this is even necessary)

8) Rumble support 

  * Check later for real support. All we have right now is for mobile devices
  * https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API
  * https://www.w3.org/TR/vibration/
