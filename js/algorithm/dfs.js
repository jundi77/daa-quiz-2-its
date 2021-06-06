class DFS {

    constructor(maps, getChildNodeFn, finishedNodeEvaluatorFn) {
        this._maps = maps
        this._finishStateEvaluatorFn = finishedNodeEvaluatorFn
        this._getChildNodeFn = getChildNodeFn
        this._callStackSize = 0
        this._haveSearched = false
        this._haveDoneSearched = false
        this._stopSearch = false
        this._finishedNode = []
    }

    search() {
        if (!this._haveSearched) {
            this._haveSearched = true
            this._search(this._maps, this._getChildNodeFn, this._finishStateEvaluatorFn)
            return true
        }

        return false
    }

    stop() {
        this._stopSearch = true
    }

    getFinishedNode() {
        if (this._haveDoneSearched || this._stopSearch) {
            return this._finishedNode
        }

        return false
    }

    async _search(node) {        
        if (this._stopSearch) {
            return true
        }
        
        if (this._finishedNodeEvaluatorFn(node)) {
            this._finishedNode = node
            this._haveDoneSearched = true
            return true
        }

        ++this._callStackSize

        it = 0
        while((childNode = this._getChildNodeFn(node, it++)) !== false) {
            if (await this._search(childNode, getChildNodeFn, finishedNodeEvaluatorFn)) {
                --this._callStackSize
                return true
            }
        }

        return false
    }
}