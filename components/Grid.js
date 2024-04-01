import { config }		from "./config.js"
import { Tile } 		from "./Tile.js"
import { isDefined2D }	from "./helpers.js"

export class Grid 
{
	constructor(width, height) 
	{
		this.width = width
		this.height = height
		this.grid = this.initialize()
	}

	initialize() 
	{
		return Array.from({ length: this.width }, (_, row) => 
			Array.from({ length: this.height }, (__, column) => 
			{
				const currentY = column - this.height + config.tileFallingMargin * (column - this.height)
				return new Tile(row, currentY)
			})
		)
	}

	process() 
	{
		this.grid.forEach((row) => 
		{
			row.forEach((tile, columnIndex) => 
			{
				this.fallingTiles(tile, columnIndex)
				if (columnIndex < row.length - 1) 
				{
					this.distributeTiles(row, columnIndex)
				}
			})
		})
		this.additionTiles()
	}

	fallingTiles(tile, column) 
	{
		tile.falling(column)
	}

	distributeTiles(row, columnIndex) 
	{
		const tileTop = row[columnIndex]
		const tileBottom = row[columnIndex + 1]
		if (!tileTop.deleted && tileBottom.deleted && tileBottom.zoom === tileBottom.maxZoom) 
		{
			row[columnIndex] = tileBottom
			row[columnIndex + 1] = tileTop
		}
	}

	additionTiles()
	{
		for(let row = 0; row < this.grid.length; row++)
		{
			if(!this.grid[row][0].deleted) continue
			if(this.grid[row][0].zoom < this.grid[row][0].maxZoom) continue

			for(let column = 0; column < this.grid[row].length; column++)
			{
				if(this.grid[row][column].deleted && column != this.grid[row].length-1) continue
				if(this.grid[row][column].currentY<0) break
				
				this.grid[row][0] = new Tile(row,-config.tileFallingMargin-1)
			}
		}
	}

	needMix() 
	{
		for (let x = 0; x < this.grid.length; x++) 
		{
			for (let y = 0; y < this.grid[x].length; y++) 
			{
				if (!isDefined2D(x, y, this.grid)) continue
				if (this.grid[x][y].deleted) return false
				if (this.grid[x][y].currentY < y) return false

				const type = this.grid[x][y].type
				if (isDefined2D(x + 1, y, this.grid) && this.grid[x + 1][y].type == type)
					return false
				if (isDefined2D(x, y + 1, this.grid) && this.grid[x][y + 1].type == type)
					return false
			}
		}
		return true
	}

	neighboringTilesByType(x, y, type, found = []) 
	{
		if (!isDefined2D(x, y, this.grid)) return
		if (this.grid[x][y].deleted) return
		if (this.grid[x][y].currentY < y) return
		if (this.grid[x][y].type !== type) return
		if (found.some(tile => tile.row == x && tile.column == y)) return

		found.push({row:x,column:y})
		this.neighboringTilesByType(x+1,y,type,found)
		this.neighboringTilesByType(x-1,y,type,found)
		this.neighboringTilesByType(x,y+1,type,found)
		this.neighboringTilesByType(x,y-1,type,found)
		return found
	}

	neighboringTilesByRadius(cx, cy, radius) 
	{
		const found = []
		for (let x = cx-radius; x <= cx + radius; x++) 
		{
			for (let y = cy - radius; y <= cy + radius; y++) 
			{
				if (!isDefined2D(x,y,this.grid)) continue
				if(this.grid[x][y].deleted) continue
				if(this.grid[x][y].currentY<y) continue
				if ((x-cx)**2 + (y-cy)**2 <= radius**2) found.push({row:x,column:y})
			}
		}
		return found
	}

  	pop(event, bomb = false) 
  	{
		const positions = this.getCoordinates(event)
		const x = positions.x
		const y = positions.y

		if (!isDefined2D(x, y, this.grid)) return
		if (this.grid[x][y].deleted) return
		if (this.grid[x][y].currentY < y) return

		const type = this.grid[x][y].type
		let coordinates = []
		if (!bomb) 
			coordinates = this.neighboringTilesByType(x, y, type)
		else
	  		coordinates = this.neighboringTilesByRadius(x, y, config.tileBombRadius)

		if (coordinates.length < config.tileMinNeighboor) 
			return []

		this.deleteTiles(coordinates)

		return coordinates
	}

  	deleteTiles(coordinates) 
  	{	
		if (!coordinates) return

		for (let coordinate of coordinates) 
		{
	  		this.grid[coordinate.row][coordinate.column].deleted = true
		}
	}

	getCoordinates(event) 
  	{
		const { offsetX, offsetY } = event
		const x = Math.floor((offsetX - config.canvasPadding) / config.tileWidth)
		const y = Math.floor((offsetY - config.canvasPadding - config.extraCanvasHeight) / config.tileWidth)
		return { x, y }
	}
}
