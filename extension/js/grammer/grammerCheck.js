const gramPattern = {
    loopOrFunction: /:$/,
}


function isNewCode(text) {
    console.log(text.search(gramPattern.loopOrFunction))
    return text.search(gramPattern.loopOrFunction); // Return >=0 when find pattern else return -1
}

export {isNewCode};