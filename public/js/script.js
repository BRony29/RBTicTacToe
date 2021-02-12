// On charge les informations utiles
const statusDisplay = document.querySelector("#statut")
let gameActive = true
let currentPlayer = "X"
let gameState = ["", "", "", "", "", "", "", "", ""]

// On définit les conditions de victoire
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// Messages
const gagne = () => `Le joueur ${currentPlayer} a gagné`
const egalite = () => "Egalité"
const tourJoueur = () => `C'est au tour du joueur ${currentPlayer}`

// On affiche quel joueur commence
statusDisplay.innerHTML = tourJoueur()

// On met en place les écouteurs d'évènements
document.querySelectorAll(".case").forEach(cell => cell.addEventListener("click", gestionClicCase))
document.querySelector("#recommencer").addEventListener("click", recommencer)

/**
 * Cette fonction gère le clic sur les cases du jeu
 */
function gestionClicCase() {
    // On récupère l'index de la case cliquée
    const indexCase = parseInt(this.dataset.index)

    // On vérifie si la case est déjà remplie ou le jeu terminé
    if (gameState[indexCase] !== "" || !gameActive) {
        return
    }

    // On écrit le symbole du joueur dans le tableau gameState et la case
    gameState[indexCase] = currentPlayer
    this.innerHTML = currentPlayer

    if (currentPlayer == "X") {
        document.querySelectorAll('.case')[indexCase].style.color = "#0d6efd";
    } else {
        document.querySelectorAll('.case')[indexCase].style.color = "#dc3545";
    }

    // On vérifie si le joueur a gagné
    verifGagne()
}

/**
 * Cette fonction vérifie si le joueur a gagné
 */
function verifGagne() {
    let tourGagnant = false

    // On parcourt toutes les conditions de victoire
    for (let winningCondition of winningConditions) {
        // On récupère les 3 cases de la condition de victoire
        let val1 = gameState[winningCondition[0]]
        let val2 = gameState[winningCondition[1]]
        let val3 = gameState[winningCondition[2]]

        // Si l'une des cases est vide
        if (val1 === "" || val2 === "" || val3 === "") {
            continue
        }

        // Si les 3 cases sont identiques
        if (val1 === val2 && val2 === val3) {
            // On gagne
            tourGagnant = true
            break
        }
    }

    // Si on a gagné
    if (tourGagnant) {
        statusDisplay.innerHTML = gagne()
        gameActive = false
        return
    }

    // Si toutes les cases sont remplies
    if (!gameState.includes("")) {
        statusDisplay.innerHTML = egalite()
        gameActive = false
        return
    }

    // On change de joueur
    currentPlayer = currentPlayer === "X" ? "O" : "X"
    statusDisplay.innerHTML = tourJoueur()
}

/**
 * Cette fonction réinitialise le jeu
 */
function recommencer() {
    currentPlayer = "X"
    gameActive = true
    gameState = ["", "", "", "", "", "", "", "", ""]
    statusDisplay.innerHTML = tourJoueur()
    document.querySelectorAll(".case").forEach(cell => cell.innerHTML = "")
}