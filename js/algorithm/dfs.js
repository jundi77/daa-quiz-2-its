export default class DFS {


    /**
     * Constructor.
     * 
     * @param {*} maps Any data structure available
     */
    constructor(maps) {
        this._maps = maps
        this._callStackSize = 0
        this._haveSearched = false
        this._haveDoneSearched = false
        this._stopSearch = false
        this._finishedNode = null
        this._visitedNode = {}
    }

    /**
     * Fungsi publik untuk search.
     * 
     * @returns bool
     */
    async search(errCallback, failedCallback, successCallback) {
        if (!this._haveSearched) {
            this._haveSearched = true
            this._search(this._maps, this._getChildNodeFn, this._finishStateEvaluatorFn)
                .catch(err => errCallback(err))
                .then(successVal => {
                    if (this._finishedNode) {
                        successCallback(this._finishedNode)
                    } else {
                        failedCallback()
                    }
                })
            return
        }

        /**
         * Dianggap gagal karena sedang/sudah mencari
         */
        errCallback(new Error("Telah mencari. Untuk melakukan pencarian ulang, instansiasi kelas kembali."))
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
            throw new Error("Pencarian diberhentikan.")
        }
        
        if (this._finishedNodeEvaluatorFn(node)) {
            this._finishedNode = node
            this._haveDoneSearched = true
            return true
        }

        let nodeStr = JSON.stringify(node)
        this._visitedNode[nodeStr] = true
        
        ++this._callStackSize
        it = 0
        while((childNode = this._getChildNodeFn(node, it++)) !== false) {
            if (!this._visitedNode[nodeStr] && await this._search(childNode)) {
                --this._callStackSize
                return true
            }
        }

        --this._callStackSize
        return false
    }

    /**
     * Abstrak method, ini untuk mendapatkan child node dari parent
     * @param {*} node 
     * @param {*} id 
     */
    _getChildNodeFn(node, id) {throw new Error("Method belum diimplementasikan.")}

    /**
     * Abstrak method, untuk evaluasi jika node adalah node tujuan
     * 
     * @param {*} node 
     */
    _finishStateEvaluatorFn(node) {throw new Error("Method belum diimplementasikan.")}
}