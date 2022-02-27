import { GameModel, BoardModel, ShipsModel } from './models';
import { GameView, BoardView, ShipsView } from './views';
import { GameController, BoardController, ShipsController } from './controllers';

const main = () => {

	// Ships

	const shipsModel = new ShipsModel();
	const shipsView = new ShipsView(shipsModel, {
		querySelector: document.querySelector('#ships'),
		rotateButton: document.querySelector('#rotate')
	});
	const shipsController = new ShipsController(shipsModel, shipsView);

	// Game

	const gameModel = new GameModel(10, shipsModel, 'player');
    const gameView = new GameView(gameModel, {
		startButton: document.querySelector('#start'),
		info: document.querySelector('#info'),
		status: document.querySelector('#status')
	});
	const gameController = new GameController(gameModel, gameView);
	
	// Boards

	// Computer

	const computerBoardModel = new BoardModel(10, shipsModel);
    const computerBoardView = new BoardView(computerBoardModel, {
		querySelector: document.querySelector('#battlefield--enemy')
	});
    const computerBoardController = new BoardController(computerBoardModel, computerBoardView, false);
	computerBoardController.setComputerShips();

	// Player

	const playerBoardModel = new BoardModel(10, shipsModel);
    const playerBoardView = new BoardView(playerBoardModel, {
		querySelector: document.querySelector('#battlefield--player')
	});
    const playerBoardController = new BoardController(playerBoardModel, playerBoardView);

	
}

document.addEventListener("DOMContentLoaded", main);