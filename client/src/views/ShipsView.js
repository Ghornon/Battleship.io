import EventEmitter from '../EventEmitter';

class ShipsView extends EventEmitter {
	constructor(model, elements) {
		super();
		this._model = model;
		this._elements = elements;
		this.rebuildBoard();

		// attach model listeners
		this._model.on('shipRemoved', () => this.rebuildBoard());

		this._elements.rotateButton.addEventListener('click', (event) =>
			this.emit('rotateShips', event)
		);
	}

	updateBoardDirection(event) {
		event.preventDefault();
		this._elements.querySelector.classList.toggle('battlefield--flex-row');
	}

	addEventListeners(element) {
		element.addEventListener('mousedown', (event) =>
			this._model.setSelectedShip(event.target.id)
		);
	}

	rebuildBoard() {
		const shipArray = this._model.getShipsArray();
		const grid = this._elements.querySelector;
		grid.innerHTML = '';

		shipArray.forEach((ship) => {
			const div = document.createElement('div');
			div.classList.add('ship', `${ship.name}-container`);
			div.draggable = true;
			this.addEventListeners(div);

			for (let i = 0; i < ship.length; i++) {
				const innerDiv = document.createElement('div');
				innerDiv.id = `${ship.name}-${i}`;
				div.appendChild(innerDiv);
			}
			grid.appendChild(div);
		});
	}
}

export default ShipsView;
