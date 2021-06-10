export default class DFS {


    /**
     * Constructor.
     * 
     * @param {*} node Any data structure available
     */
    constructor(node) {
        this._node = node
        this._callStackSize = 0
        this._haveDoneSearched = false
        this._stopSearch = false
        this._finishedNode = null
        this._visitedNode = {}
        this._worker = null
        this._found = false
        this._loadUtil()
    }

    /**
     * Any methods that the worker must do,
     * put it here.
     */
    _loadUtil() {
        this.utilDir = '/js/algorithm/util/DFSDefault.js'
        let _getChildNodeFn, _finishStateEvaluatorFn
        ({
            _getChildNodeFn,
            _finishStateEvaluatorFn
        } = import(this.utilDir))

        this._getChildNodeFn = _getChildNodeFn
        this._finishStateEvaluatorFn = _finishStateEvaluatorFn
    }

    /**
     * Fungsi publik untuk search.
     * 
     * @returns bool
     */
    async search(errCallback, failedCallback, successCallback) {
        if (!this._haveSearched) {
            this._haveSearched = true

            this._worker = new Worker('/js/algorithm/worker/dfs_search.js')
            this._worker.onmessage = (event) => {
                [
                    this._found,
                    this._finishedNode,
                    this._visitedNode,
                ] = event.data
                
                this._worker.terminate()
                if (this._found) {
                    successCallback(this._finishedNode)
                    return
                }
                failedCallback()
            }
            this._worker.onerror = (event) => {
                let msg = event.message
                this._worker.terminate()
                errCallback(new Error(`Worker ${msg}`))
            }
            this._worker.postMessage([
                this.utilDir,
                this._node
            ])

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
        this._worker.terminate()
        this._stopSearch = true
    }

    /**
     * Untuk mengambil node hasil
     * 
     * @returns Array | false
     */
    getFinishedNode() {
        if (this._stopSearch) {
            return this._finishedNode
        }

        return false
    }
}