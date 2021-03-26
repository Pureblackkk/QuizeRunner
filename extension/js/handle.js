import {renderTextarea, renderLeft, renderRight, renderUp, renderDown, renderEnter} from './render.js';
import {cursorPos as CursorPos, codeStatus as CodeStatus, maxWidthSpan, DOMNAME, lastTextLength as LastTextLength, codeStatus} from './common.js';
import {setCursorPosition as setCursorPos} from './textarea.js';
import {isNewCode} from './grammer/grammerCheck.js';
import {runCode} from  './runner/python.js';

// Update Status 
function updateStatus(newCursorPos, newCursorRow, textLen) {
    CursorPos.setCursor(newCursorPos);
    CursorPos.setRow(newCursorRow);
    if(textLen) {
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


    // TODO: Render the new added element from the cursor start position
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
    let [newCursorPos, newCursorRow] = renderUp(cursorPos, cursorRow, maxWidthSpan, lastLen);
    // Set textarea key
    setCursorPos(document.getElementById(DOMNAME.textarea), newCursorPos);

    updateStatus(newCursorPos, newCursorRow);
}

function downArrowKey() {
    console.log('down handle');
    const cursorPos = CursorPos.getCursor(); // Get the current cursor position in textareabox
    const cursorRow = CursorPos.getRow(); // Get the current cursor row
    const lastLen = LastTextLength.getLastLen(); // Get the last text length 
    let [newCursorPos, newCursorRow] = renderDown(cursorPos, cursorRow, maxWidthSpan, lastLen);
    // Set textarea key
    setCursorPos(document.getElementById(DOMNAME.textarea), newCursorPos);

    updateStatus(newCursorPos, newCursorRow); 
}

// Todo: Fill the enter key 
function enterKey() {
    const textarea = document.getElementById(DOMNAME.textarea);
    const text = textarea.value;
    if(isNewCode(text) >= 0) { // Start new line 
        const cursorPos = CursorPos.getCursor(); // Get the current cursor position in textareabox
        const cursorRow = CursorPos.getRow(); // Get the current cursor row 

        // Change the code status 
        codeStatus.setStatus('Code');

        // Render enter space placeholder 
        renderEnter(textarea, cursorPos, cursorRow, maxWidthSpan);

    }else { // TODO: Case2: submmit code and run 
        runCode();
    }
    
    

}

export {inputHandle, leftArrowKey, rightArrowKey, upArrowKey, downArrowKey, enterKey};
