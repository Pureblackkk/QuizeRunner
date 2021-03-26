// Main.js
import {inputListen, directionKeyListen} from '../js/listen.js';
import {inputHandle, leftArrowKey, rightArrowKey, upArrowKey, downArrowKey, enterKey} from '../js/handle.js';
import {loadPyodide} from '../js/runner/python.js';

function main() {
    // Register listening 
    inputListen(inputHandle);
    directionKeyListen(leftArrowKey, rightArrowKey, upArrowKey, downArrowKey, enterKey);

    // Initial pyodide
    loadPyodide();
}
main();
