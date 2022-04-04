import EventEmitter from '../EventEmitter';

class GameView extends EventEmitter {
	constructor(model, elements) {
		super();
		this._model = model;
		this._elements = elements;

		// attach model listeners
		this._model.on('infoTextSet', () => this.updateInfo());
		this._model.on('statusTextSet', () => this.updateStats());
		this._model.on('buttonUnlocked', () => this.unlockStartButton());
		this._elements.startButton.addEventListener('click', (event) =>
			this.emit('startButtonClicked', event)
		);
	}

	updateInfo() {
		this._elements.info.innerText = this._model.getInfoText();
	}

	updateStats() {
		this._elements.status.innerText = this._model.getStatusText();
	}

	unlockStartButton() {
		this._elements.startButton.classList.remove('button--disabled');
		this._elements.startButton.disabled = this._model.startButton;
	}
}

export default GameView;
