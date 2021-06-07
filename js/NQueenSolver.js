import DFS from './algorithm/dfs.js'

export default class NQueenSolver extends DFS {
    constructor(maps) {
        super(maps, NQueenSolver.move, NQueenSolver.isFinished)
    }

    static move(node, id) {
        throw new Error("Not implemented yet")
    }

    static isFinished(node) {
        throw new Error("Not implemented yet")
    }
}