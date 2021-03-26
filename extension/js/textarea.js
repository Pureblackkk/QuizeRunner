// Set textarea cursor position 
function setCursorPosition(textarea, pos) {
    // Modern browsers
    if (textarea.setSelectionRange) {
      textarea.focus();
      textarea.setSelectionRange(pos, pos);
    
    // IE8 and below
    } else if (textarea.createTextRange) {
      var range = textarea.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
}

// TODO: Clean the textarea 
function cleanTextarea(textarea) {
  
}


export {setCursorPosition};
