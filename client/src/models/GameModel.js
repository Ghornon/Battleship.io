import EventEmitter from '../EventEmitter';

class GameModel extends EventEmitter {
	constructor(width = 10, shipsModel, player = null) {
		super();
		this._width = width;
		this._infoText = '';
		this._statusText = '';
		this._player = player;
		this._startButtonDisabled = true;
		this._shipsModel = shipsModel;
	}

	getWidth() {
		return this._width;
	}

	getInfoText() {
		return this._infoText;
	}

	setInfoText(text) {
		this._infoText = text;
		this.emit('infoTextSet', this._infoText);
	}

	getStatusText() {
		return this._statusText;
	}

	setStatusText(text) {
		this._statusText = text;
		this.emit('statusTextSet', this._statusText);
	}

	getPlayer() {
		return this._player;
	}

	nextTurn() {
		if (this._player == 'player') this._player = 'enemy';
		else this._player = 'player';

		this.emit('nextTurn');
	}

	toggleStartButton() {
		this._startButtonDisabled = !this._startButtonDisabled;
		this.emit('toggleStartButton');
	}
}

export default GameModel;
