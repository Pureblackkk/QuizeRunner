// Main.js
import {inputListen, directionKeyListen} from '../js/listen.js';
import {inputHandle, leftArrowKey, rightArrowKey, upArrowKey, downArrowKey, enterKey} from '../js/handle.js';
import {loadPyodide} from '../js/runner/python.js';
import {initialEvent} from '../js/event.js'

function main() {
    // Initial pyodide
    loadPyodide();

    // Register event
    initialEvent();
    
    // Register listening 
    inputListen(inputHandle);
    directionKeyListen(leftArrowKey, rightArrowKey, upArrowKey, downArrowKey, enterKey);


}
main();
