import EventEmitter from "../EventEmitter";

class BoardModel extends EventEmitter {
	constructor(width = 10, shipsModel) {
		super();
		this._board = [];
		this._shipsModel = shipsModel;

		for (let i = 0; i < width; i++) {
			for (let j = 0; j < width; j++) {
				this._board.push({x: j, y: i, isTaken: false, classList: []});
			}
		}
	}
  
	getBoard() {
		return this._board;
	}

	updateBoard({x, y, isTaken, classList}) {
		this._board = this._board.map(square => {
			if (square.x == x && square.y == y){
				return {x, y, isTaken, classList};
			}
			return square;
		});

		this.emit('boardUpdated');
	}
}

export default BoardModel;