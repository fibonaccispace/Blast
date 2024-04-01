import { config } from "./config.js"

export class TileRenderer 
{
	constructor(context) 
	{
		this.context = context
	}

	render(tile) 
	{
		if (tile.zoom == tile.maxZoom) return

		const { width, height, x, y, alpha } = this.calculateTileProperties(tile)

		this.context.globalAlpha = alpha
		this.context.drawImage(tile.image, x, y, width, height)
	}

	zooming(tile) 
	{
		if (tile.deleted)
		tile.zoom = Math.min(Math.max(tile.zoom + tile.zoomSpeed, tile.minZoom),tile.maxZoom)
	}

	calculateTileProperties(tile) 
	{
		const zoom = tile.zoom
		const image = tile.image
		const ratio = image.height / image.width
		const width = config.tileWidth / zoom
		const height = (config.tileWidth / zoom) * ratio

		const x = config.tileWidth * tile.row + (config.tileWidth / 2 - width / 2)
		const y = config.tileWidth * tile.currentY + ((config.tileWidth * ratio) / 2 - height / 2)

		const transparency = 1 - (tile.zoom - tile.minZoom) / (tile.maxZoom / 2)
		const alpha = Math.min(Math.max(transparency, 0), 1)

		return { width, height, x, y, alpha }
	}
}
