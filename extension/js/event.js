import {DOMNAME} from './common.js';

// Initial the event for dom element
function initialEvent() {
    let inputNode = document.getElementById(DOMNAME.textarea);
    inputNode.focus(); // Let the textera to focus

    terminalEvent(inputNode); // Bind a click function for container

    // TODO: Bind event for the icon
    
}

function terminalEvent(inputNode) {
    let terminalNode = document.getElementsByClassName(DOMNAME.terminal)[0];
    terminalNode.onclick = function () {
        inputNode.focus();
    }
}

export {initialEvent}