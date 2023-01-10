let chessBoards = document.querySelectorAll("cg-board");
for (let boards of chessBoards) {
  boards.style.backgroundImage = `url("chrome-extension://@${chrome.runtime.id}/images/board.png")`;
}
let chessPieces = document.querySelectorAll("piece");
for (let piece of chessPieces) {
  piece.style.top = "1.1%";
  piece.style.left = "1.1%";
  piece.style.width = "10.5%";
  piece.style.height = "10.5%";
}
const changePieces = () => {
  const colors = ["black", "white"];
  const pieces = ["king", "queen", "rook", "knight", "bishop", "pawn"];
  for (let color of colors) {
    for (let piece of pieces) {
      let chessPieces = document.getElementsByClassName(`${color} ${piece}`);
      for (let chessPiece of chessPieces) {
        chessPiece.style.backgroundImage = `url("chrome-extension://@${chrome.runtime.id}/images/chessPieces/${color}-${piece}.svg")`;
        if (piece === "pawn") {
          chessPiece.style.width = "8.5%";
          chessPiece.style.height = "8.5%";
          chessPiece.style.top = "2%";
          chessPiece.style.left = "2.5%";
        }
      }
    }
  }
};
changePieces();
let mutation = new MutationObserver(() => {
  let selectedSquare = document.querySelector("square[class='selected']");
  if (!selectedSquare) {
    return null;
  }
  selectedSquare.style.backgroundColor = `rgba(194, 212, 138,0.8)`;

  let movingSquares = document.querySelectorAll("square[class='move-dest']");
  if (!movingSquares) {
    return null;
  }
  for (let square of movingSquares) {
    square.style.background = `radial-gradient(rgba(194,212,138) 19%, rgba(0, 0, 0, 0) 20%)`;
  }

  let lastMoves = document.querySelectorAll("square[class='last-move']");
  if (!lastMoves) {
    return null;
  }
  for (let square of lastMoves) {
    square.style.background = `rgba(194,212,138,0.7)`;
  }

  let occupiedSquares = document.querySelectorAll(".oc");
  if (!occupiedSquares) {
    return null;
  }
  for (let square of occupiedSquares) {
    square.style.background = `radial-gradient(transparent 0%, transparent 79%, rgba(194,212,138, 0.8) 80%)`;
  }

  let checkSelected = document.getElementsByClassName("check selector");
  if (!checkSelected) {
    return null;
  }
  for (let square of checkSelected) {
    square.style.background = `rgba(194,212,138,0.5)`;
  }
});
mutation.observe(chessBoard, {
  childList: true,
  attributes: true,
  subtree: true,
  characterDataOldValue: true,
});
for (let child of chessBoard.children) {
  mutation.observe(child, {
    childList: true,
    attributes: true,
    subtree: true,
    attributeOldValue: true,
    characterData: true,
    characterDataOldValue: true,
  });
}
