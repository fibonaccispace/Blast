import { config } from "./config.js"
import { random } from "./helpers.js"

const tiles = 
[
  "media/images/blocks/blue.png",
  "media/images/blocks/green.png",
  "media/images/blocks/purple.png",
  "media/images/blocks/red.png",
  "media/images/blocks/yellow.png",
];

export class Tile 
{
	constructor(row, currentY) 
	{
		this.row = row
		this.currentY = currentY
		this.deleted = false

		this.zoom = 1
		this.minZoom = 1
		this.maxZoom = 5
		this.zoomSpeed = 0.2

		this.initializeImage()
	}

	initializeImage() 
	{
		this.type = random(0, tiles.length)
		this.image = new Image()
		this.image.src = tiles[this.type]
	}

	falling(targetY) 
	{
		this.currentY = Math.min(this.currentY + config.tileFallingSpeed, targetY)
	}
}
