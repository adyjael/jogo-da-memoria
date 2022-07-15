const grid = document.querySelector(".grid")
const spanPlayer = document.querySelector(".player")
const timer = document.querySelector(".timer")

const characteres  = [
    'beth',
    'jerry',
    'jessica',
    'meeseeks',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'scroopy',
    'summer',
]

const createElement  = (tag, className) =>{
    const elemet = document.createElement(tag)
    elemet.className = className;
    return elemet;
}

let firstCard="";
let secondCard="";

const checkEndGame = ()=> {
    const disableCards = document.querySelectorAll('.disable-card')
    if(disableCards.length == 20) {
        alert(`Parabéns ${spanPlayer.innerHTML} e o seu tempo foi ${timer.innerHTML}`)
        clearInterval(this.loop)
    }
}

const checkCards = () => {
    
    const fistrCharacter = firstCard.getAttribute("data-charater")
    const secondCharacter = secondCard.getAttribute("data-charater")
    
    if (fistrCharacter == secondCharacter) {
        firstCard.firstChild.classList.add('disable-card')
        secondCard.firstChild.classList.add('disable-card')

        firstCard =""
        secondCard =""

        checkEndGame()

    }else {
        setTimeout(()=> {
            firstCard.classList.remove('reveal-card')
            secondCard.classList.remove('reveal-card')
            firstCard = ""
            secondCard = ""
        },500)
    }
}


const revealCard =({target}) =>  {
   
    if (target.parentNode.className.includes('reveal-card')){
        return;
    }
    if(firstCard === ""){
        target.parentNode.classList.add('reveal-card')
        firstCard = target.parentNode;

    }else if (secondCard === "") {
        target.parentNode.classList.add('reveal-card')
        secondCard = target.parentNode;
        checkCards()
    }
}

const createCard = (character) => {
    const card = createElement("div","card")
    const front = createElement("div","face front")
    const back = createElement("div","face back")
    front.style.backgroundImage = `url(../img/${character}.png)`
    card.appendChild(front)
    card.appendChild(back)
    
    card.addEventListener("click", revealCard )
    card.setAttribute("data-charater", character)
    return card
}

const loadGame = () => {
    const duplicarChareter = [ ...characteres, ...characteres]
    const shufflearray = duplicarChareter.sort(() => Math.random() - 0.5)
    Math.random()
    shufflearray.forEach((character)=> {
        const card = createCard(character)
        grid.appendChild(card)
    })
}
const startTime = () => {
   this.loop = setInterval(( )=> {
        const currentTimer = Number(timer.innerHTML)
        timer.innerHTML = currentTimer + 1
    }, 1000)
}

window.onload = ()=> {
    spanPlayer.textContent = window.localStorage.getItem("player")
    startTime()
    loadGame()
}


