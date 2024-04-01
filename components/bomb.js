const buttonBomb = document.getElementById("button-bomb")

const bomb = 
{
	isBomb: false,
	/**
	 * @param {boolean} value
	*/

	set setBomb(value) 
	{
		this.isBomb = value
	},
	setBombStyle: function() 
	{
		if (!bomb.isBomb) buttonBomb.style.opacity = 0.5
		else buttonBomb.style.opacity = 1
	},
}

buttonBomb.addEventListener("click", () => 
{
	bomb.isBomb = !bomb.isBomb
})

export { bomb }
