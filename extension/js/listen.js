/* 
    Register for listening and pass the infomation 
 */

// Listen input
function inputListen(func) {
    let text = document.getElementById('terminalInput');
    text.addEventListener('input', function() {
        func(this.value);
    });
}

// Listen Arrow key
function directionKeyListen(...func) {
    window.addEventListener('keydown', function(event) {
        switch (event.key) {
            case "ArrowLeft":
                // Left pressed
                func[0]();
                break;
            case "ArrowRight":
                // Right pressed
                func[1]();
                break;
            case "ArrowUp":
                // Up pressed
                event.preventDefault();  // Notice that the deafault key move may casue failure to selection
                func[2]();
                break;
            case "ArrowDown":
                // Down pressed
                event.preventDefault(); // Notice that the deafault key move may casue failure to selection
                func[3]();
                break;
            case "Enter":
                event.preventDefault();
                func[4]();
                break;
        }
    });
}

export{inputListen, directionKeyListen};