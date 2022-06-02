const selectGamemodeOverlay = document.getElementById("select_gamemode")
const gamemodes = document.querySelectorAll(".gamemode")
const turn = document.getElementById("turn")

export const openNav = handleClick => {
  selectGamemodeOverlay.style.height = "100%"
  gamemodes.forEach(mode =>
    mode.addEventListener("click", handleClick, { once: true })
  )
}

export const closeNav = () => (selectGamemodeOverlay.style.height = "0%")

export const updateTurnText = round => turn.textContent = round + "'s turn"
export const updateWinnerText = winner => turn.textContent = winner === null ? "Tie!" : `${winner} wins!`