import { Grid }         from "./Grid.js"
import { GridRenderer } from "./GridRenderer.js"
import { random }       from "./helpers.js"
import { config }       from "./config.js"
import { Interface }    from "./Interface.js"
import { bomb }         from "./bomb.js"

export class Game 
{
    constructor(canvas) 
    {
        this.canvas = canvas
        this.context = canvas.getContext("2d")
    
        this.playable = false
        this.level = 1

        this.initializeLevel()
        this.applyCanvasStyling()
    }

    resetLevelParams() 
    {
        this.moves = 0
        this.score = 0
        this.mixing = 0
    }

    applyCanvasStyling() 
    {
        this.canvas.width = config.tileWidth * this.width
        this.canvas.height = config.tileWidth * this.height + config.extraCanvasHeight
        this.canvas.style.padding = `${config.canvasPadding}px`
    }

    play() 
    {
        this.grid.process()
        this.gridRenderer.render()
        bomb.setBombStyle()

        if (this.needsToMixTiles()) 
        {
            this.mixTiles()
        }
        if (this.mixing >= config.tileMixingMax) 
        {
            this.restartLevel()
            this.interface.showMenuRestart()
        }
    }

    needsToMixTiles() 
    {
        return this.grid.needMix() && this.mixing < config.tileMixingMax
    }

    mixTiles() 
    {
        this.mixing++
        this.grid = new Grid(this.width, this.height)
        this.gridRenderer = new GridRenderer(this.grid.grid, this.context)
    }

    initializeLevel() 
    {
        this.width = random(config.minWidth, config.maxWidth + 1)
        this.height = random(config.minHeight, config.maxHeight + 1)
        this.resetLevelParams()
        this.grid = new Grid(this.width, this.height)
        this.gridRenderer = new GridRenderer(this.grid.grid, this.context)
        this.applyCanvasStyling()
        this.interface = new Interface(this)
        this.defineTargetValues()
    }

    defineTargetValues() 
    {
        this.targetMoves = random(10, 25)
        this.targetScore = Math.floor(this.targetMoves*3.8)
    }

    restartLevel() 
    {
        this.resetLevelParams()
        this.defineTargetValues()
    }

    getPercentScore() 
    {
        return (100 * this.score) / this.targetScore
    }

    getAdditionScore(coordinates) 
    {
        return coordinates ? coordinates.length : 0
    }

    action(event, bomb = false) 
    {
        if (!this.playable) return

        let coordinates = this.grid.pop(event, bomb)
        if (coordinates.length < config.tileMinNeighboor) return

        this.score += this.getAdditionScore(coordinates)
        this.moves++
    }

    levelUp() 
    {
        this.level++
    }
}
