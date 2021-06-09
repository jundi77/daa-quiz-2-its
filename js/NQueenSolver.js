import DFS from './algorithm/dfs.js'

export default class NQueenSolver extends DFS {
    constructor (maps) {
        super(maps)
        this._classDir = '/js/NQueenSolver.js'
    }

    static _getChildNodeFn(node, id) {
        throw new Error("Not implemented yet")
    }

    static _finishStateEvaluatorFn(node) {
        throw new Error("Not implemented yet")
    }
}