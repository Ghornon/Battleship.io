import EventEmitter from '../EventEmitter';

class Ship {
	constructor(name, length) {
		this.name = name;
		this.length = length;
	}
}

class ShipsModel extends EventEmitter {
	constructor() {
		super();
		this._shipsArray = [];
		this._selectedShipName;
		this._isHorizontal = true;

		this._shipsArray.push(new Ship('carrier', 5));
		this._shipsArray.push(new Ship('battleship', 4));
		this._shipsArray.push(new Ship('cruiser', 3));
		this._shipsArray.push(new Ship('submarine', 3));
		this._shipsArray.push(new Ship('destroyer', 2));
	}

	rotateShips() {
		this._isHorizontal = !this._isHorizontal;
		this.emit('shipsRotated');
	}

	getShipsDirection() {
		return this._isHorizontal;
	}

	getSelectedShip() {
		return this._selectedShipName;
	}

	setSelectedShip(name) {
		this._selectedShipName = name;
		this.emit('shipSelected');
	}

	getShipsArray() {
		return this._shipsArray;
	}

	getShip(name) {
		return this._shipsArray.find((ship) => ship.name == name);
	}

	getShipsCount() {
		return this._shipsArray.length;
	}

	removeShip(name) {
		this._shipsArray = this._shipsArray.filter((ship) => ship.name != name);
		this.emit('shipRemoved');
	}
}

export default ShipsModel;
