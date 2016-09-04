# JOYMAP

A Javascript Gamepad API wrapper: https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API

#### Key features:

 * Wraps the ever-changing gamepad standard into a flexible API
 * Supports stateful inputs for ease of use: Each input can be pressed, justPressed, released or justReleased
 * Supports assigning aliases that can be either functional or some simple renaming
 * Adds basic event handling of input state change
	* joymap.addEvent('A.justPressed', () => console.log('jump!'))
	* joymap.addEvent('B', () => console.log('run!'))
 * All of the above is handled by the Gamepad's internal update function which can be changed up to support or stop supporting certain features and can be even replaced with a custom function, depending on what is passed to joyMap.setUpdate(...)
 * All configuration can be done at the top level, affecting all gamepads, or at the individual gamepad level

#### How to:

* Install all the dependencies with: npm install
* Run all the examples and webpack-dev-server on localhost:9000 with: npm run dev
* Build only the minified library to /bin folder with: npm run build
* Inside /src/examples are the ... examples. Might want to take a look there first.
* Inside /src/bin are all the files of the library itself. You might also want to look at that.

#### Coming soon/ish:

1) A movement example
 * An example using the canvas to render a small creature that can be moved by the analog sticks (point & move)
 * It will also react to other inputs by changing color

2) User rebinding
 * Adds support for player rebinding of buttons, called userMap
 * Adds listen function to Gamepad for allowing the user to rebind a button to whatever is pressed next
 * Adds rebinding buttons to the examples

3) User profile support
 * Said profiles consist of name and userMap config
 * Adds get and set said profiles as objects or JSON.stringify strings
 * Adds support for sessionStorage for saving said profiles
 * Adds user profile to the examples

5) Controller types
 * Adds support for identifying types of controllers (need to wait for standarization between browsers)
 * Will be used for showing the right button prompts in-game
 * Will be used for mapping the right buttons for the main gamepads and browsers

6) Rumble support 
 * Check later for real support. All we have right now is for mobile devices
 * https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API
 * https://www.w3.org/TR/vibration/
