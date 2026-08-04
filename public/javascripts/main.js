const socket = io()
const chess = new Chess()

const boardElement = document.querySelector('.chessBoard')

let draggedPiece = null
let playerRole = null
let sourceSquare = null

const getPieceUnicode = (square) => {
    const unicodePieces = {
        // Black pieces (filled/solid)
        'p': '♟',  // black pawn
        'r': '♜',  // black rook
        'n': '♞',  // black knight
        'b': '♝',  // black bishop
        'q': '♛',  // black queen
        'k': '♚',  // black king
        
        // White pieces (outlined/hollow) - THESE ARE DIFFERENT
        'P': '♙',  // white pawn - outlined
        'R': '♖',  // white rook - outlined
        'N': '♘',  // white knight - outlined
        'B': '♗',  // white bishop - outlined
        'Q': '♕',  // white queen - outlined
        'K': '♔'   // white king - outlined
    }
    return unicodePieces[square.type] || "";
}

const renderBoard = () => {
    const board = chess.board()
    boardElement.innerHTML = ""
    
    // Flip board for black player
    if (playerRole === 'b') {
        boardElement.classList.add('flipped')
    } else {
        boardElement.classList.remove('flipped')
    }
    
    board.forEach((row, rowIndex) => {
        row.forEach((square, squareIndex) => {
            const squareElement = document.createElement('div')
            squareElement.classList.add('square',
                (rowIndex + squareIndex) % 2 === 0 ? 'light' : 'dark'
            )

            squareElement.dataset.row = rowIndex
            squareElement.dataset.col = squareIndex
            
            if (square) {
                const pieceElement = document.createElement('div')
                pieceElement.classList.add('piece',
                    square.color === 'w' ? 'white' : 'black'
                )
                pieceElement.innerText = getPieceUnicode(square)
                
                // Only allow dragging if it's the player's turn and their piece
                const isPlayerTurn = chess.turn() === playerRole
                const isPlayerPiece = playerRole === square.color
                pieceElement.draggable = isPlayerTurn && isPlayerPiece
                
                if (pieceElement.draggable) {
                    pieceElement.classList.add('draggable')
                }

                pieceElement.addEventListener('dragstart', (e) => {
                    if (pieceElement.draggable) {
                        draggedPiece = pieceElement
                        sourceSquare = { row: rowIndex, col: squareIndex }
                        e.dataTransfer.setData('text/plain', "")
                        pieceElement.classList.add('dragging')
                    }
                })
                
                pieceElement.addEventListener('dragend', () => {
                    draggedPiece = null
                    sourceSquare = null
                    pieceElement.classList.remove('dragging')
                })
                squareElement.append(pieceElement)
            }

            squareElement.addEventListener('dragover', (e) => {
                e.preventDefault()
            })

            squareElement.addEventListener('drop', (e) => {
                e.preventDefault()
                if (draggedPiece && sourceSquare) {
                    const targetSource = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col)
                    }
                    handleMove(sourceSquare, targetSource)
                }
            })
            boardElement.appendChild(squareElement)
        })
    })
}

const handleMove = (source, target) => {
    const move = {
        from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
        to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
        promotion: "q",
    }
    
    // Validate the move locally first
    const result = chess.move(move)
    if (result) {
        socket.emit('move', move)
        // Reset drag state
        draggedPiece = null
        sourceSquare = null
        renderBoard()
    }
}

// Socket event listeners
socket.on('playerRole', (role) => {
    playerRole = role
    renderBoard()
})

socket.on('spectatorRole', () => {
    playerRole = null
    renderBoard()
})

socket.on('boardState', (fen) => {
    chess.load(fen)
    renderBoard()
})

socket.on('move', (move) => {
    chess.move(move)
    renderBoard()
})

socket.on('invalidMove', (move) => {
    console.log('Invalid move attempted:', move)
    renderBoard()
})

socket.on('error', (errorMsg) => {
    console.error('Server error:', errorMsg)
})

renderBoard()