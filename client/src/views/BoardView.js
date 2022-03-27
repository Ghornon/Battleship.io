import EventEmitter from "../EventEmitter";

class BoardView extends EventEmitter {
	constructor(model, { querySelector, hideClassList = false }) {
		super();
		this._model = model;
		this._querySelector = querySelector;
		this.rebuildBoard();
		this._hideClassList = hideClassList;

		// attach model listeners
		this._model.on('boardUpdated', () => this.rebuildBoard());
	}

	addEventListeners(element) {
		element.addEventListener('drop', event => this.emit('droppedOnBoard', event));
		element.addEventListener('dragstart', event => event.preventDefault());
		element.addEventListener('dragover', event => event.preventDefault());
		element.addEventListener('dragenter', event => event.preventDefault());
		element.addEventListener('drop', event => event.preventDefault());
	}

	rebuildBoard() {
		const board = this._model.getBoard();
		this._querySelector.innerHTML = '';

		board.forEach(({x, y, classList = []}) => {
			const square = document.createElement('div');
			square.dataset.x= x;
			square.dataset.y= y;

			const filteredClassList = classList.filter(className => className == 'miss' || className == 'hit');
			
			if (classList.length)
				if (this._hideClassList)
					square.classList.add(...filteredClassList);
				else
					square.classList.add(...classList);

			// attach listener
			this.addEventListeners(square);
			this._querySelector.appendChild(square);
		});
	}
}

export default BoardView;