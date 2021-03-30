// TODO: Fix the problem to import it to handle.js
let maxWidthSpan = 40; // Max number of span each line 

// Name for dom class name
const DOMNAME = {
    'code': 'terminal-code', // class terminal-code 
    'terminal': 'terminal', // class terminal 
    'cursor': 'cursor', // class cursor
    'textarea': 'terminalInput' // id textarea
}

// Set Curosr Style
const CursorStyle = {
    'backgroundColor': '#b8b8b8',
    'display': 'inline-block',
    'width': '8.65625px',
    'className': 'cursor',
    'innerHTML': '&nbsp'
}

// Closure for code status
const codeStatus = (function() {
    let status = 'TEXT'; // TEXT for cross line delete, 'CODE' for single inline delete

    function getStatus() {
        return status;
    }

    function setStatus(val) {
        status = val;
    }

    return {
        getStatus: getStatus,
        setStatus: setStatus
    }

})();


// Closure for cursor position
const cursorPos = (function() {
    let cursorPosition = 0;
    let currentRow = 0;
    function setCursor(val) {
        cursorPosition = val;
    }
    
    function addCursor() {
        cursorPosition++;
    }

    function minusCursor() {
        cursorPosition--;
    }

    function getVal() {
        return cursorPosition;
    }
    
    function setRow(val) {
        currentRow = val;
    }

    function getCurrentRow() {
        return currentRow;
    }

    return {
        cusorInc: addCursor, // Cursor position add one 
        cursorDec: minusCursor,  // Cursor position minus one 
        setCursor: setCursor, // Set cursor value
        getCursor: getVal, // Get cursor value
        setRow: setRow, // Set Row value 
        getRow: getCurrentRow // get Row value 

    }
})();

// Closure for textLength
const lastTextLength = (function() {
    let lastTextLen = 0;

    function getLastLen() {
        return lastTextLen;
    }

    function setLastLen(val) {
        lastTextLen = val;
    }

    return {
        getLastLen: getLastLen,
        setLastLen: setLastLen
    }
})();



export{DOMNAME, cursorPos, lastTextLength, CursorStyle, codeStatus, maxWidthSpan};