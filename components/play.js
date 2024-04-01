import { Game } from "./Game.js"
import { bomb } from "./bomb.js"

const canvas = document.getElementById("canvas")
const buttonStart = document.getElementById("button-next")
const buttonRestart = document.getElementById("button-restart")

const game = new Game(canvas)
game.initializeLevel()
game.interface.showMenuStart(game)

canvas.addEventListener("click", (event) => 
{
	game.action(event, bomb.isBomb)

	if (bomb.isBomb) bomb.setBomb = false
	if (game.playable) game.interface.showMenuGame(game)

	if (game.score >= game.targetScore) 
	{
		game.playable = false
		game.levelUp()
		game.initializeLevel()
		game.interface.showMenuStart()
	}
	else if (game.moves == game.targetMoves) 
	{
		game.playable = false
		game.interface.showMenuRestart()
	}
})

buttonStart.addEventListener("click", () => 
{
	game.playable = true
	game.interface.showMenuGame(game)
})

buttonRestart.addEventListener("click", () => 
{
	game.playable = true
	game.restartLevel()
	game.interface.showMenuGame(game)
})

export { game }
