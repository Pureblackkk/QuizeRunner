/*  
    Function: Save the history code node as a queue 
    Form: queue[{node: lastCodeElement, text: inputNode.value}]
*/

const historyCode = (function () {
    const _fixedSize = 20;
    let queue = [];
    let pointIndex = 0;
    
    function _dequeue() {
        return queue.shift();
    }

    function enqueue(node) {
        if(queue.length === _fixedSize) {
            _dequeue();
        }
        queue.push(node)
        pointIndex = queue.length - 1;
    }

    function pointNext() {
        let ans = true;
        let queueLen = queue.length - 1;
        pointIndex++;
        if(pointIndex > queueLen) {
            ans = false
        }
        pointIndex = pointIndex > (queueLen) ? (queueLen) : pointIndex;

        console.log('pointIndex', pointIndex);

        return ans;
    }

    function pointBack() {
        pointIndex--;
        pointIndex = pointIndex < 0 ? 0 : pointIndex;
        console.log('pointIndex', pointIndex);
    }

    function getNode() {
        return queue[pointIndex];
    }

    return {
        enqueue: enqueue,
        pointNext: pointNext,
        pointBack: pointBack,
        getItem: getNode
    }


})();

export {historyCode}