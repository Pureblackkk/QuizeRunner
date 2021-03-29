/* 
    This file is used to generate the terminal 
*/
import {DOMNAME, CursorStyle} from './common.js';

// Render Single Span 
function renderSpan(text, father) {
    let newSpan = document.createElement('span');
    if(text === ' '){
        newSpan.innerHTML = '&nbsp;';
    }else{
        newSpan.textContent = text;
    }
    father.append(newSpan);
}

// Delete Single Span
function deleteSpan(relLoc, father) {
    let deleteNode = father.children[relLoc];
    deleteNode.parentNode.removeChild(deleteNode);
}


/* 
    Use: render textera content
    Return: cursorPos cursorRow 
*/ 

function renderTextarea(text, textLength, maxWidthSpan, cursorPos, cursorRow, lastLen, codeStatus) {
    // Get all line div 
    let codeNode = document.getElementsByClassName(DOMNAME.code)[0];
    let lineDivList = document.querySelectorAll('.' + DOMNAME.code + ' div');
    
    // Remove cursor
    deleteCursor(cursorPos, lastLen);

    // Find it is input or delete
    let res = null;
    console.log('CodeStatus', codeStatus);
    if(codeStatus === 'TEXT'){
        if(textLength > lastLen) { // When input text
            res = renderInput(text, textLength, maxWidthSpan, cursorPos, cursorRow, lastLen, lineDivList, codeNode);
        }else { // When delete text  
            res = renderDelete(text, textLength, maxWidthSpan, cursorPos, cursorRow, lastLen, lineDivList, codeNode);
        }
    }
    else{ // When in code mode
        if(textLength > lastLen) {
            res = renderCodeIn(text, textLength, maxWidthSpan, cursorPos, cursorRow, lastLen, lineDivList, codeNode);
        }else{
            res = renderCodeDel(text, textLength, maxWidthSpan, cursorPos, cursorRow, lastLen, lineDivList, codeNode);
        }
    }
    
     
    // Get new Status
    let currDiv = res[0];
    let newCursorPos = res[1];
    let newCursorRow = res[2];

    // Render cursor 
    creatCursor(currDiv, newCursorPos % maxWidthSpan);

    // Return new cursorPos, cursorRow
    return [newCursorPos, newCursorRow];
}

// Render input of textarea in 'TEXT' mode 
function renderInput(text, textLength, maxWidthSpan, cursorPos, cursorRow, lastLen, lineDivList, codeNode) {
    let currDiv = null;
    if(cursorPos === lastLen){ // Case1: cursor right now at the end of text
        let diffNum = textLength - lastLen; 
        // console.log('textLength', textLength);
        // console.log('lastLen', lastLen);
        currDiv = lineDivList[cursorRow];
        while(diffNum > 0){
            // Render new elements
            renderSpan(text[cursorPos], currDiv)
            diffNum--;
            cursorPos++;
            // Cursor move to next line 
            if(cursorPos % maxWidthSpan === 0) {
                // Add new line
                currDiv = document.createElement('div');
                codeNode.append(currDiv);
                cursorRow++;
            }
        }
    }else {
         // When cursor is not at the tail
         let p = cursorPos; // Temp cursor position
         let row = cursorRow; // Temp row number
         let relativeP = p % maxWidthSpan; // Temp relative location 
         currDiv = lineDivList[row]; // Record current div
         while(p < textLength){
            if(lineDivList[row].children[relativeP]) { // Already has element
                lineDivList[row].children[relativeP].innerHTML = text[p];
            } else { // No element
                renderSpan(text[p], currDiv);
            }

            p++; // update cursor position
            relativeP = (relativeP + 1) % maxWidthSpan; // update relative position
            if(relativeP === 0) { // update row number
                row++; 
                if(row > (lineDivList.length - 1)) {
                    currDiv =  document.createElement('div');
                    codeNode.append(currDiv);
                }else{
                    currDiv = lineDivList[row];
                }
            }
         }
         cursorPos = cursorPos + textLength - lastLen;
         cursorRow = Math.floor(cursorPos / maxWidthSpan);
         currDiv = lineDivList[cursorRow];
    }

    return [currDiv, cursorPos, cursorRow];
}

// Render delete of textarea in 'TEXT' mode 
function renderDelete(text, textLength, maxWidthSpan, cursorPos, cursorRow, lastLen, lineDivList, codeNode) {
    let currDiv = null;
    if(cursorPos === lastLen) {  // Case1: cursor right now at the end of text
        let diffNum = textLength - lastLen;
        currDiv = lineDivList[lineDivList.length - 1];
        while(diffNum < 0){
            if(cursorPos % maxWidthSpan === 0) {
                codeNode.removeChild(currDiv);
                cursorRow --;
                currDiv = lineDivList[cursorRow];
            }
            diffNum++;
            cursorPos--;
            deleteSpan(cursorPos % maxWidthSpan, currDiv)// Delete last span
        }
    }else {
        // When cursor is not at the tail
        let p = cursorPos + textLength - lastLen; // Temp cursor position
        let row = Math.floor(p / maxWidthSpan); // Temp row number
        let relativeP = p % maxWidthSpan; // Temp relative location 
        currDiv = lineDivList[row]; // Record current div
        while(p < textLength){
           if(lineDivList[row].children[relativeP]) { // Already has element
               console.log(row);
               console.log(relativeP);
               lineDivList[row].children[relativeP].innerHTML = text[p];
           } else { // No element
               renderSpan(text[p], currDiv);
           }

           p++; // update cursor position
           relativeP = (relativeP + 1) % maxWidthSpan; // update relative position
           if(relativeP === 0) { // update row number
               row++; 
               currDiv = lineDivList[row];
           }
        }
        
        // Delete the useless span 
        console.log(relativeP);
        for (let i = relativeP; i < lineDivList[row].children.length; i++) {
            lineDivList[row].removeChild(lineDivList[row].children[i]);
        }
        // Delete the useless div line 
        for(let i = row+1; i < lineDivList.length; i++) {
            codeNode.removeChild(lineDivList[i]);
        }

        cursorPos = cursorPos + textLength - lastLen;
        cursorRow = Math.floor(cursorPos / maxWidthSpan);
        currDiv = lineDivList[cursorRow];
    }
    return [currDiv, cursorPos, cursorRow];
}


// Render input of textarea in 'CODE' mode 
function renderCodeIn(text, textLength, maxWidthSpan, cursorPos, cursorRow, lastLen, lineDivList, codeNode) {
    let currDiv = null;
    if(cursorPos === lastLen){ // Case1: cursor right now at the end of text
        let diffNum = textLength - lastLen; 
        // console.log('textLength', textLength);
        // console.log('lastLen', lastLen);
        currDiv = lineDivList[cursorRow];
        while(diffNum > 0){
            // Render new elements
            renderSpan(text[cursorPos], currDiv)
            diffNum--;
            cursorPos++;
            // Cursor move to next line 
            if(cursorPos % maxWidthSpan === 0) {
                // Add new line
                currDiv = document.createElement('div');
                currDiv.innerHTML = '. . .&nbsp;';
                codeNode.append(currDiv);
                cursorRow++;
            }
        }
    }else {
         // When cursor is not at the tail
         let p = cursorPos; // Temp cursor position
         let row = cursorRow; // Temp row number
         let relativeP = p % maxWidthSpan; // Temp relative location 
         currDiv = lineDivList[row]; // Record current div
         while(p < textLength){
            if(lineDivList[row].children[relativeP]) { // Already has element
                lineDivList[row].children[relativeP].innerHTML = text[p];
            } else { // No element
                renderSpan(text[p], currDiv);
            }

            p++; // update cursor position
            relativeP = (relativeP + 1) % maxWidthSpan; // update relative position
            if(relativeP === 0) { // update row number
                row++; 
                if(row > (lineDivList.length - 1)) {
                    currDiv =  document.createElement('div');
                    codeNode.append(currDiv);
                }else{
                    currDiv = lineDivList[row];
                }
            }
         }
         cursorPos = cursorPos + textLength - lastLen;
         cursorRow = Math.floor(cursorPos / maxWidthSpan);
         currDiv = lineDivList[cursorRow];
    }

    return [currDiv, cursorPos, cursorRow];
}

// Render delete of textarea in 'CODE' mode
function renderCodeDel(text, textLength, maxWidthSpan, cursorPos, cursorRow, lastLen, lineDivList, codeNode) {
    let currDiv = null;
    if(cursorPos === lastLen) {  // Case1: cursor right now at the end of text
        let diffNum = textLength - lastLen;
        currDiv = lineDivList[lineDivList.length - 1];
        while(diffNum < 0){
            if(cursorPos % maxWidthSpan === 0) {
                codeNode.removeChild(currDiv);
                cursorRow --;
                currDiv = lineDivList[cursorRow];
            }
            diffNum++;
            cursorPos--;
            deleteSpan(cursorPos % maxWidthSpan, currDiv)// Delete last span
        }
    }else {
        // When cursor is not at the tail
        let p = cursorPos + textLength - lastLen; // Temp cursor position
        let row = Math.floor(p / maxWidthSpan); // Temp row number
        let relativeP = p % maxWidthSpan; // Temp relative location 
        currDiv = lineDivList[row]; // Record current div
        while(p < textLength){
           if(lineDivList[row].children[relativeP]) { // Already has element
               console.log(row);
               console.log(relativeP);
               lineDivList[row].children[relativeP].innerHTML = text[p];
           } else { // No element
               renderSpan(text[p], currDiv);
           }

           p++; // update cursor position
           relativeP = (relativeP + 1) % maxWidthSpan; // update relative position
           if(relativeP === 0) { // update row number
               row++; 
               currDiv = lineDivList[row];
           }
        }
        
        // Delete the useless span 
        console.log(relativeP);
        for (let i = relativeP; i < lineDivList[row].children.length; i++) {
            lineDivList[row].removeChild(lineDivList[row].children[i]);
        }
        // Delete the useless div line 
        for(let i = row+1; i < lineDivList.length; i++) {
            codeNode.removeChild(lineDivList[i]);
        }

        cursorPos = cursorPos + textLength - lastLen;
        cursorRow = Math.floor(cursorPos / maxWidthSpan);
        currDiv = lineDivList[cursorRow];
    }
    return [currDiv, cursorPos, cursorRow];
}

// Render left arrow key operation
function renderLeft(cursorPos, cursorRow, maxWidthSpan, lastLen) {
    // Cursor at the head
    if(cursorPos === 0){
        return [cursorPos, cursorRow]
    }
    // Delete cursor 
    deleteCursor(cursorPos, lastLen);

    // Render new cursor
    if(cursorPos % maxWidthSpan === 0){
        cursorRow--;
    }
    cursorPos--;
    let codeNode = document.getElementsByClassName(DOMNAME.code)[0];
    creatCursor(codeNode.children[cursorRow], cursorPos % maxWidthSpan);
    
    return [cursorPos, cursorRow];

}


// Render right arrow key operation
function renderRight(cursorPos, cursorRow, maxWidthSpan, currLen) {
    // Get the node info
    let lineDivList = document.querySelectorAll('.' + DOMNAME.code + ' div');
    // Cursor at the tail

    if(cursorPos === currLen){
        return [cursorPos, cursorRow]
    }

    // Delete cursor 
    deleteCursor(cursorPos, currLen);

    // Render new cursor
    cursorPos++;
    if(cursorPos % maxWidthSpan === 0){
        cursorRow++;
    }
    creatCursor(lineDivList[cursorRow], cursorPos % maxWidthSpan);

    return [cursorPos, cursorRow];
}


// Render up arrow key operation
function renderUp(cursorPos, cursorRow, maxWidthSpan, currentLen) {
    if(cursorRow === 0){
        // TODO: fill the function to trace the hisotry code
        return [cursorPos, cursorRow];
    }
    
    // Delete cursor 
    deleteCursor(cursorPos, currentLen);

    cursorRow--;
    cursorPos = cursorPos - maxWidthSpan;

    // Render new cursor
    let lineDivList = document.querySelectorAll('.' + DOMNAME.code + ' div');
    creatCursor(lineDivList[cursorRow], cursorPos % maxWidthSpan);


    return [cursorPos, cursorRow];

}


// Render down arrow key operation
function renderDown(cursorPos, cursorRow, maxWidthSpan, currentLen) {
    // Cursor at the last line 
    let lineDivList = document.querySelectorAll('.' + DOMNAME.code + ' div');
    let lineDivLength = lineDivList.length - 1;

    if(cursorRow === lineDivLength){
        return [cursorPos, cursorRow];
    }

    // Delete cursor 
    deleteCursor(cursorPos, currentLen);

    // Update
    cursorRow ++;
    cursorPos += maxWidthSpan;
  
    if(cursorRow === lineDivLength) { // If it is on the last line
        let currDiv = lineDivList[lineDivLength];
        let spanLen = currDiv.children.length - 1;
        if((cursorPos % maxWidthSpan) > spanLen){ // At last line and exceed
            // Update new cursor position 
            cursorPos = currentLen;
            // Render new Cursor at the tail
            creatCursor(currDiv, cursorPos % maxWidthSpan);
        }else {
            // At the last line but not exceed 
            creatCursor(currDiv, cursorPos % maxWidthSpan);
        }
    }else {// if it is not on the last line
        let currDiv = lineDivList[cursorRow];
        creatCursor(currDiv, cursorPos % maxWidthSpan);
    }

    return [cursorPos, cursorRow];
}


// Delete cursor 
function deleteCursor(cursorPos, lastLen) {
    let cursor = document.getElementsByClassName(DOMNAME.cursor)[0];
    if(cursor){
        if(cursorPos === lastLen){
        // if (cursor.innerHTML === '&nbsp;') { // Delete cursor when it is at the tail
            cursor.parentNode.removeChild(cursor);
        }else{ // Delete cursor when it is on the text
            cursor.removeAttribute('style');
            cursor.classList.remove('cursor');
        }
    }

}


// Creat cursor 
function creatCursor(father, location){    
    //May be useful, animation: blink 1s infinite;} @keyframes blink {0% {opacity: 1;}  100% {opacity: 0;}}

    // Append cursor 
    if(father.children.length === location){ // When the cursor locates at the tail
        // Creat cursor 
        let cursor = document.createElement('span');
        cursor.innerHTML = CursorStyle.innerHTML;
        cursor.className = CursorStyle.className;

        // Set cursor style
        cursor.style.backgroundColor = CursorStyle.backgroundColor;
        cursor.style.display = CursorStyle.display;
        cursor.style.width = CursorStyle.width;

        father.appendChild(cursor);
    }else { // Not in the tail, but at the text
        // Get cursor and set style
        let cursor = father.children[location];
        cursor.style.backgroundColor = CursorStyle.backgroundColor;
        cursor.style.display = CursorStyle.display;
        cursor.style.width = CursorStyle.width;
        cursor.className = CursorStyle.className;
    }    
}


// TODO: Render enter key operation 
function renderEnter(textarea, cursorPos, cursorRow, maxWidthSpan) {
    console.log('Enter key down and new line');
    let lineDivList = document.querySelectorAll('.' + DOMNAME.code + ' div'); // Get div list 
    // TODO: Find a way to mark line break
    // Fill space until line end 
    let lastLine = lineDivList[lineDivList.length - 1];
    let childLen = lastLine.children.length - 1;
    let addSpaceLen = 0;
    let addText = '';
    for(let i = childLen; i < maxWidthSpan; i++) {
        addText += ' ';
        addSpaceLen++;
    }
    textarea.value = textarea.value + addText; // Add new text
    textarea.dispatchEvent(new Event("input")); // Triger the input event

}

// Render the code output
function renderStdout(stdout, outCodeElement, maxWidthSpan) {
    let stdOutLen = stdout.length;
    let s = 0;
    let currDiv = null;
    while(s < stdOutLen){

        if(stdout[s] === '\\n'){
            // Add new line 
            currDiv = document.createElement('div');
            outCodeElement.append(currDiv);
            s++;
            continue;
        }

        if((s % maxWidthSpan === 0)) {
            // Add new line
            currDiv = document.createElement('div');
            outCodeElement.append(currDiv);
        }

        // Render new elements
        renderSpan(stdout[s], currDiv);
        s++;
        
    }
}



export {renderTextarea, renderLeft, renderRight, renderUp, renderDown, renderEnter, renderStdout};

