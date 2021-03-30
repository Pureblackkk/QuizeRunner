// Initalize the pyodide
function loadPyodide() {
    let languagePluginLoader = chrome.extension.getBackgroundPage().languagePluginLoader;
    let pyodide = chrome.extension.getBackgroundPage().pyodide;
    languagePluginLoader
    .then(() => {
        pyodide.runPython(`
            import sys
            import io    
            sys.stdout = io.StringIO()    
        `);
        
        console.log('Pyodide initalized!')
    })
}

// Run the python code submitted
function runCode(code) {
    // Get backgroud-page element pyodide
    let pyodide = chrome.extension.getBackgroundPage().pyodide;

    // Run code
    let ans = null;
    try {
        ans = pyodide.runPython(code);
        if(ans === undefined){
            ans = pyodide.runPython("sys.stdout.getvalue()"); // Read the output from the sdtout stream
            pyodide.runPython("sys.stdout = io.StringIO()"); // Creat a new string io object to recieve the output
        }
        return ['output', ans.toString()];     
    }
    catch(error) {
        return ['error', error.message]; // Only return out the error message but not the trace back
        // console.log(error.message); 
    }

}


export{runCode, loadPyodide};