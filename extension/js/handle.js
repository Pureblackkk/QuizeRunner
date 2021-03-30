import {renderTextarea, renderLeft, renderRight, renderUp, renderDown, renderEnter, renderStdout, renderNewCode} from './render.js';
import {cursorPos as CursorPos, codeStatus as CodeStatus, maxWidthSpan, DOMNAME, lastTextLength as LastTextLength, codeStatus, lastTextLength} from './common.js';
import {setCursorPosition as setCursorPos} from './textarea.js';
import {isNewCode} from './grammer/grammerCheck.js';
import {runCode} from  './runner/python.js';
import {historyCode as HistoryCode} from './runner/history.js'

// Update Status 
function updateStatus(newCursorPos, newCursorRow, textLen=null) {
    CursorPos.setCursor(newCursorPos);
    CursorPos.setRow(newCursorRow);
    if(textLen !== null) {
        LastTextLength.setLastLen(textLen);
    }
}

// Handle the input 
function inputHandle(value) {
    console.log(value);
    const textLen = value.length; // Whole length of text
    const cursorPos = CursorPos.getCursor(); // Get the current cursor position in textareabox
    const cursorRow = CursorPos.getRow(); // Get the current cursor row
    const lastLen = LastTextLength.getLastLen(); // Get the last text length 
    const codeStatus = CodeStatus.getStatus();


    // Render the new added element from the cursor start position
    let [newCursorPos, newCursorRow] = renderTextarea(value, textLen, maxWidthSpan, cursorPos, cursorRow, lastLen, codeStatus);

    // Update Status
    updateStatus(newCursorPos, newCursorRow, textLen);
}

// Handle the arrow key
function leftArrowKey() {
    // Render left key 
    console.log('left handle');
    const cursorPos = CursorPos.getCursor(); // Get the current cursor position in textareabox
    const cursorRow = CursorPos.getRow(); // Get the current cursor row
    const lastLen = LastTextLength.getLastLen(); // Get the last text length 
    let [newCursorPos, newCursorRow] = renderLeft(cursorPos, cursorRow, maxWidthSpan, lastLen);

    // Update new status

    updateStatus(newCursorPos, newCursorRow);

}

function rightArrowKey() {
    console.log('right handle');
    const cursorPos = CursorPos.getCursor(); // Get the current cursor position in textareabox
    const cursorRow = CursorPos.getRow(); // Get the current cursor row
    const lastLen = LastTextLength.getLastLen(); // Get the last text length 
    let [newCursorPos, newCursorRow] = renderRight(cursorPos, cursorRow, maxWidthSpan, lastLen);

    updateStatus(newCursorPos, newCursorRow);

}

function upArrowKey() {
    console.log('up handle');
    const cursorPos = CursorPos.getCursor(); // Get the current cursor position in textareabox
    const cursorRow = CursorPos.getRow(); // Get the current cursor row
    const lastLen = LastTextLength.getLastLen(); // Get the last text length 
    let [newCursorPos, newCursorRow, newLastLen] = renderUp(cursorPos, cursorRow, maxWidthSpan, lastLen);
    // Set textarea key
    setCursorPos(document.getElementById(DOMNAME.textarea), newCursorPos);

    // Updates cursor position and lastLength
    updateStatus(newCursorPos, newCursorRow);
    if(newLastLen) {
        lastTextLength.setLastLen(newLastLen);
    }
}

function downArrowKey() {
    console.log('down handle');
    const cursorPos = CursorPos.getCursor(); // Get the current cursor position in textareabox
    const cursorRow = CursorPos.getRow(); // Get the current cursor row
    const lastLen = LastTextLength.getLastLen(); // Get the last text length 
    let [newCursorPos, newCursorRow, newLastLen] = renderDown(cursorPos, cursorRow, maxWidthSpan, lastLen);
    // Set textarea key
    setCursorPos(document.getElementById(DOMNAME.textarea), newCursorPos);

    // Updates cursor position and lastLength
    updateStatus(newCursorPos, newCursorRow);
    if(newLastLen) {
        lastTextLength.setLastLen(newLastLen);
    } 
}

// Todo: Fill the enter key 
function enterKey() {
    const textarea = document.getElementById(DOMNAME.textarea); 
    const text = textarea.value;
    if(isNewCode(text) >= 0) { // Start new line 
        const cursorPos = CursorPos.getCursor(); // Get the current cursor position in textareabox
        const cursorRow = CursorPos.getRow(); // Get the current cursor row 

        // Change the code status 
        codeStatus.setStatus('CODE');

        // Render enter space placeholder 
        renderEnter(textarea, cursorPos, cursorRow, maxWidthSpan);

    }else { // Submmit code and run 
        let [type, stdout] = runCode(text);

        const terminalNode = document.getElementsByClassName(DOMNAME.terminal)[0];
        let lastCodeElement =  document.getElementsByClassName(DOMNAME.code);
        lastCodeElement = lastCodeElement ? lastCodeElement[lastCodeElement.length - 1] : null;

        // Render the output of python code
        if(stdout.length > 0){ 
            let outCodeElement = document.createElement('div');
            outCodeElement.className = 'code-output' + '-' + type;

            // Render the output to the code-output element
            renderStdout(stdout, outCodeElement, maxWidthSpan);

            // Add the new div element into terminal
            terminalNode.insertBefore(outCodeElement, lastCodeElement.nextSibling);
        }

        // Render new round
        let inputNode = document.getElementById('terminalInput');
        let newCodeElement = document.createElement('div');
        newCodeElement.className = "terminal-code"
        renderNewCode(newCodeElement);
        terminalNode.insertBefore(newCodeElement, inputNode);

        // Save code node and text submitted into history
        let saveObj = {node: lastCodeElement.cloneNode(true), text: inputNode.value};
        HistoryCode.enqueue(saveObj);     
        console.log(HistoryCode.getItem().node);

        if(lastCodeElement) lastCodeElement.className = 'code-submitted'; // Change the class name of the last code
            
        // Refresh cursor status, Code status and clear the input
        updateStatus(0, 0, 0); 
        inputNode.value = '';
        codeStatus.setStatus('TEXT');
        
        console.log('lastLen', lastTextLength.getLastLen())
    }
}

export {inputHandle, leftArrowKey, rightArrowKey, upArrowKey, downArrowKey, enterKey};
