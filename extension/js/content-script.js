// select the web content
if (!window.x){
    x = {};
}
x.Selector = {};
x.Selector.getSelected = function (){
    if (typeof window.getSelection() != "undefined"){
        var sel = window.getSelection();
        if (sel.rangeCount){
            var container = document.createElement("div");
            for(var i = 0, len = sel.rangeCount; i<len; i++){
                container.appendChild(sel.getRangeAt(i).cloneContents());
            }
            html = container.textContent;
            return html;
        }
    } else if (typeof window.getSelection() != "undefined") {
        if (document.getSelection().type == "Text") {
            html = document.getSelection().createRange().htmlText;
            return html;
        }
    }
}

// send message to background
function sendMessageToBackground(message) {
    chrome.runtime.sendMessage({code: message}, function(response) { });
}

$(document).ready(function() {
    $(document).bind("mouseup", function() {
        var mytext = x.Selector.getSelected();
        // sent it to the background
        sendMessageToBackground(mytext);
    });
});
