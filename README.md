# joymap
A Javascript Gamepad API wrapper based on currently experimental technology
Base API: https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API


// TODO: Add support for player rebinding of buttons, called userMap
//       * Allow the usermap to load from different sources
//       * Add a listen function to Gamepad for allowing the user to rebind a button to whatever is pressed next
// TODO: Add showcase of input, showing all connected controllers, each with a gamepad picture demonstrating button states
//       * Add counters made with aliases at the bottom, pressed, just pressed, released and justReleased
//       * These are showed each in a column, the last value is pushed from the top and fades a little to grey after a second
// TODO: Add showcase for rebinding of buttons
// TODO: Prepare package and gulp files
// TODO: Add support for identifying types of controllers:
//       * For showing the right button prompts in-game
//       * For mapping the right buttons for the main gamepads and browsers

// CHECK: Polling method on animation frame is mandatory due to gamepad objects changing each frame, check later
//       * As of 21/12/2015: This continues to be so
