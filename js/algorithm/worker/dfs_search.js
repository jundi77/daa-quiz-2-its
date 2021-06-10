/**
 * @var boolean
 */
let initialized = false

/**
 * @var Function
 */
let finishStateEvaluatorFn, getChildNodeFn

/**
 * @var Object
 */
let _finishedNode = null, _visitedNode = {}

/**
 * Fungsi protected untuk search. Asynchronous.
 * Melakukan DFS pada node hingga ditemukan hasil.
 * Rekursif.
 * 
 * @param {Array} node 
 * @returns bool
 */
function search(node, stackCount=0) {
    
    if (finishStateEvaluatorFn(node)) {
        _finishedNode = node
        return true
    }
    
    let it = 0, childNode
    while((childNode = getChildNodeFn(node, it, stackCount)) !== false) {
        it = childNode.newId
        childNode = childNode.child

        if (search(childNode, stackCount + 1)) {
            return true
        }
    }

    return false
}

self.onmessage = (event) => {
    /**
     * This worker is not reusable.
     * If it has been used, must throw it away :(
     */
    if (initialized) {
        throw new Error("Worker DFS telah berjalan")
    }

    initialized = true

    let [
        utilDir,
        maps
    ] = event.data

    importScripts(utilDir)
    getChildNodeFn = _getChildNodeFn
    finishStateEvaluatorFn = _finishStateEvaluatorFn

    let found = search(maps)

    // console.log(found)
    self.postMessage([
        found,
        _finishedNode,
        _visitedNode,
    ])
}