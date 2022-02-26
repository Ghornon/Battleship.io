import EventEmitter from "../EventEmitter";

class GameModel extends EventEmitter {
	constructor(width = 10, player = 'player') {
		super();
		this._width = width;
		this._infoText = "";
		this._statusText = "";
		this._player = player;
		this._startButtonDisabled = true;
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
		if (this._player == 'player')
			this._player == 'enemy';

		if (this._player == 'enemy')
			this._player == 'player';

		this.emit('nextTurn', this._player);	
	}

	unlockStart() {
		this._startButtonDisabled = false;
		this.emit('startButtonUnlocked');
	}
}

export default GameModel;