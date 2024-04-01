import { TileRenderer } from "./TileRenderer.js"

export class GridRenderer 
{
	constructor(grid, context) 
	{
		this.grid = grid
		this.context = context
		this.tileRenderer = new TileRenderer(context)
	}

	render() 
	{
		this.clearCanvas()
		for (let row = 0; row < this.grid.length; row++) 
		{
	  		for (let column = this.grid[row].length - 1; column >= 0; column--) 
	  		{
				const tile = this.grid[row][column]
				this.renderTile(tile)
			}
		}
	}

	renderTile(tile) 
	{
		this.tileRenderer.render(tile)
		this.tileRenderer.zooming(tile)
	}

	clearCanvas() 
	{
		this.context.clearRect(0,0,this.context.canvas.width,this.context.canvas.height)
	}
}
