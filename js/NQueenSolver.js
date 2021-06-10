import DFS from './algorithm/dfs.js'

export default class NQueenSolver extends DFS {
    constructor (node) {
        super(node)
        this._classDir = '/js/NQueenSolver.js'
    }

    _loadUtil() {
        this.utilDir = '/js/algorithm/util/NQueen.js'
        let _getChildNodeFn, _finishStateEvaluatorFn
        ({
            _getChildNodeFn,
            _finishStateEvaluatorFn
        } = import(this.utilDir))

        this._getChildNodeFn = _getChildNodeFn
        this._finishStateEvaluatorFn = _finishStateEvaluatorFn
    }
}