# joymap

A Javascript Gamepad API wrapper of the currently experimental API: https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API

How to run:

1) Install all the dependencies with:

	npm install

2) Run webpack-dev-server for local dev environment with:

	npm start

3) To deploy to /bin folder the minified and uglified files run:

	npm run deploy

TODO:

1) User rebinding
 * Add support for player rebinding of buttons, called userMap
 * Allow the usermap to load from different sources (text, config files, cookies, etc)
 * Add a listen function to Gamepad for allowing the user to rebind a button to whatever is pressed next
 * Add rebinding buttons to examples

2) Controller types
 * Add support for identifying types of controllers (need to wait for standarization?)
 * For showing the right button prompts in-game
 * For mapping the right buttons for the main gamepads and browsers

3) Polling method on animation frame is mandatory due to gamepad objects changing each frame, check later
 * As of 21/12/2015: This continues to be so
