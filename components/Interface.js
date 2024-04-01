export class Interface 
{
	constructor(game) 
	{
		this.game = game

		this.menuGame = document.getElementById("level")
		this.menuWin = document.getElementById("win")
		this.menuLose = document.getElementById("lose")

		this.gameMoves = document.getElementById("moves")
		this.gameTargetMoves = document.getElementById("target-moves")
		this.gameScore = document.getElementById("score")
		this.gameTargetScore = document.getElementById("target-score")
		this.gameCurrentLevelText = document.getElementById("current-level")
		this.gameNextLevelText = document.getElementById("next-level")
		this.gameProgressFill = document.getElementById("progress-fill")
		this.winLevel = document.getElementById("win-next-level")
		this.winTargetMoves = document.getElementById("level-target-moves")
		this.winTargetScore = document.getElementById("level-target-score")
		this.loseLevel = document.getElementById("lose-level")
		this.loseScore = document.getElementById("lose-score")
	}

	showMenuGame() 
	{
		this.updateTextGame()
		this.menuWin.style.display = "none"
		this.menuLose.style.display = "none"
		this.menuGame.style.display = "flex"
	}

  	showMenuStart() 
  	{
		this.updateTextStart()
		this.menuWin.style.display = "flex"
		this.menuLose.style.display = "none"
		this.menuGame.style.display = "none"
  	}

	showMenuRestart() 
  	{
		this.updateTextRestart()
		this.menuWin.style.display = "none"
		this.menuLose.style.display = "flex"
		this.menuGame.style.display = "none"
  	}

	updateTextGame() 
	{
		this.gameMoves.innerText = this.game.targetMoves - this.game.moves
		this.gameTargetMoves.innerText = this.game.targetMoves
		this.gameScore.innerText = this.game.score
		this.gameTargetScore.innerText = this.game.targetScore
		this.gameCurrentLevelText.innerText = this.game.level
		this.gameNextLevelText.innerText = this.game.level + 1
		this.gameProgressFill.style.width = `${this.game.getPercentScore()}%`
	}

	updateTextStart() 
	{
		this.winLevel.innerText = this.game.level
		this.winTargetMoves.innerText = this.game.targetMoves
		this.winTargetScore.innerText = this.game.targetScore
	}

	updateTextRestart() 
	{
		this.loseLevel.innerText = this.game.level
		this.loseScore.innerText = this.game.score
	}
}
