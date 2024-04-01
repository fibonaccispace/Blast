import { game } from "./components/play.js"

requestAnimationFrame(main)
function main() 
{
    requestAnimationFrame(main)
    game.play()
}
