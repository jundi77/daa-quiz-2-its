/**
 * Ini untuk mendapatkan child node dari parent
 * 
 * @param {*} node 
 * @param {Number} id
 */
 function _getChildNodeFn(node, id, index) {

    if (index >= node.posisi_queen.length) return false

    let posisi_queen = JSON.parse(JSON.stringify(node.posisi_queen))
    let old = [...posisi_queen[index]]
    let maxId = 8 * node.panjang

    for (; id < maxId; ++id) {

        let move = id % 8
        let diff = parseInt(id / 8) + 1

        /**
         * Do movement
         */
        switch (move) {
        case 0:
            // up
            posisi_queen[index][1] -= diff
            break
        case 1:
            // down
            posisi_queen[index][1] += diff
            break
        case 2:
            // left
            posisi_queen[index][0] -= diff
            break
        case 3:
            // right
            posisi_queen[index][0] += diff
            break
        case 4:
            // up left
            posisi_queen[index][0] -= diff
            posisi_queen[index][1] -= diff
            break
        case 5:
            // up right
            posisi_queen[index][0] += diff
            posisi_queen[index][1] -= diff
            break
        case 6:
            // down right
            posisi_queen[index][0] += diff
            posisi_queen[index][1] += diff
            break
        case 7:
            // down left
            posisi_queen[index][0] -= diff
            posisi_queen[index][1] += diff
            break
        default:
            break
        }

        // console.log(posisi_queen.toString());
        /**
         * Id is invalid for this movement,
         * increment to next id
         */
        if (
            posisi_queen[index][0] < 0 ||
            posisi_queen[index][1] < 0 ||
            posisi_queen[index][0] >= node.panjang ||
            posisi_queen[index][1] >= node.lebar
        ) {
            posisi_queen[index][0] = old[0]
            posisi_queen[index][1] = old[1]
            continue
        } else {
            return {
                child: {
                    panjang: node.panjang,
                    lebar: node.lebar,
                    posisi_queen: posisi_queen
                },
                newId: ++id
            }
        }
    }

    return false
}

/**
 * Untuk evaluasi jika node adalah node tujuan
 * 
 * @param {*} node 
 */
function _finishStateEvaluatorFn(node) {
    let queens = node.posisi_queen

    for (let i = 0; i < queens.length - 1; ++i) {
        for (let j = i + 1; j < queens.length; ++j) {
            if (
                queens[i][0] == queens[j][0] ||
                queens[i][1] == queens[j][1] ||
                Math.abs((queens[i][1] - queens[j][1]) / (queens[i][0] - queens[j][0])) == 1
            ) {
                return false
            }
        }
    }
    
    return true
}