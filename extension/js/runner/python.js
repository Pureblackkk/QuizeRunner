// Initalize the pyodide
function loadPyodide() {
    let languagePluginLoader = chrome.extension.getBackgroundPage().languagePluginLoader;
    let pyodide = chrome.extension.getBackgroundPage().pyodide;
    languagePluginLoader
    .then(() => {
        pyodide.runPython(`
            import sys
            import io        
        `);
        // sys.stdout = io.StringIO()
        console.log('Pyodide initalized!')
    })
}

// Run the python code submitted
function runCode(code) {
    // Get backgroud-page element pyodide
    let pyodide = chrome.extension.getBackgroundPage().pyodide;

    // Run code
    let ans = null;
    let isError = false;
    try {
        ans = pyodide.runPython(
            `y`
        );
        console.log(ans);
    }
    catch(error) {
        console.log(error.message); // Only print out the error message
    }

}


export{runCode, loadPyodide};