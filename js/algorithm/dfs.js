export default class DFS {


    /**
     * Constructor.
     * 
     * @param {Array} maps 2D array
     * @param {Function} getChildNodeFn Untuk mendapatkan child node dari parent
     * @param {Function} finishedNodeEvaluatorFn Untuk evaluasi jika node adalah node tujuan
     */
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

    /**
     * Fungsi publik untuk search.
     * 
     * @returns bool
     */
    search() {
        if (!this._haveSearched) {
            this._haveSearched = true
            this._search(this._maps, this._getChildNodeFn, this._finishStateEvaluatorFn)
            return true
        }

        return false
    }

    /**
     * Untuk memberhentikan pencarian secara
     * paksa.
     */
    stop() {
        this._stopSearch = true
    }

    /**
     * Untuk mengambil node hasil
     * 
     * @returns Array | false
     */
    getFinishedNode() {
        if (this._haveDoneSearched || this._stopSearch) {
            return this._finishedNode
        }

        return false
    }

    /**
     * Fungsi protected untuk search. Asynchronous.
     * Melakukan DFS pada node hingga ditemukan hasil.
     * Rekursif.
     * 
     * @param {Array} node 
     * @returns bool
     */
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
            if (await this._search(childNode)) {
                --this._callStackSize
                return true
            }
        }

        --this._callStackSize
        return false
    }
}