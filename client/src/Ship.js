class Ship {
	createShip(shipsField) {
		const ship = document.createElement('div');
		ship.classList.add('ship', `${this.name}-container`);
		ship.draggable = true;
		for (let i = 0; i < this.length; i++) {
			const div = document.createElement('div');
			div.id = `${this.name}-${i}`;
			ship.appendChild(div);
		}
		this.selector = ship;
		shipsField.appendChild(ship);
	}

	constructor(name, length) {
		this.name = name;
		this.length = length;
	}
}

export default Ship;