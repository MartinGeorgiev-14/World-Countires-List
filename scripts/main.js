import * as get from "./countires.js"
//Declaring variable that contains result from search
let globalResult = []

//Getting header buttons
const startWordButton = document.getElementById("start-word-button")
const anyWordButton = document.getElementById("any-word-button")
const arrWordButton = document.getElementById("arr-word-button")
const headerButtons = document.getElementById("header-buttons").querySelectorAll("button")

//Getting search bar input
const searchBarInput = document.getElementById("search-bar").querySelector("input")

//Getting div container that contains all displayed items
const divContainer = document.getElementById("items")

//Declaring variable for chosing search mode
let searchMode = ""

//Event listener for searching from start to end word
startWordButton.addEventListener("click", function(){
    searchMode = "searchStart"
    buttonComands(startWordButton)
})

//Event listener for searching with any letters
anyWordButton.addEventListener("click", function(){
    searchMode = "searchAny"
    buttonComands(anyWordButton)
})

//Event listener for sorting the results
arrWordButton.addEventListener("click", function(){
    const icon = arrWordButton.querySelector("i")

    if(icon.classList.value === "fa-solid fa-arrow-down-a-z"){
        icon.classList.remove("fa-arrow-down-a-z")
        icon.classList.add("fa-arrow-up-a-z")
        const sortedResult = globalResult.sort((a,b) => a.localeCompare(b))
        displayResults(sortedResult)
    }else{
        icon.classList.remove("fa-arrow-up-a-z")
        icon.classList.add("fa-arrow-down-a-z")
        const sortedResult = globalResult.sort((a,b) => b.localeCompare(a))
        displayResults(sortedResult)
    }
})

//Validation if search mode is selected
if (!searchMode) {
    searchBarInput.value = "Please select searching mod"
}
   
//Event listener for entering letters in the search bar
searchBarInput.addEventListener("keyup", function(){
    const search = searchBarInput.value
    console.log(search)
    if(searchMode === "searchStart"){
        globalResult = searchStartWord(search)
        displayResults(searchStartWord(search))
    }
    if(searchMode === "searchAny"){
        globalResult = searchForAnyWord(search)
        displayResults(searchForAnyWord(search))
    }
})

//Function that search any letters in words
function searchForAnyWord(searchWord){
    const lowerSearchWord = searchWord.toLowerCase()
    return get.countries.filter(country => {
        const lowerCountry = country.toLowerCase()
        
        
        return Array.from(lowerSearchWord).every(letter => lowerCountry.includes(letter))
    })
}

//Function that search letters from start to end in words
function searchStartWord(searchWord){
    const lowerSearchWord = Array.from(searchWord.toLowerCase())

    return get.countries.filter(country => {
        let isFound = false
        const lowerCountry = country.toLowerCase()
        //Checks is letters are contained in the beggining of the word
        for(let i = 0; i < lowerSearchWord.length; i++){
            if(lowerSearchWord[i] === lowerCountry[i]){
                isFound = true
            }
            else{
                isFound = false
                break;
            }
        }
        
        if(isFound){
            console.log(country)
            return country
       
        }
    })
   
}

//Function that displays results
function displayResults(results){
    childRemover(divContainer)

    results.forEach(result => {
        const itemDiv = document.createElement("div")

        itemDiv.classList.add("country-square")

        itemDiv.innerHTML = result
       
        divContainer.append(itemDiv)
    })
}

//Function that removes certain class from array of elements
function classRemover(array, word){
    array.forEach(element => {
        element.classList.remove(word)
    })
}

function childRemover(parent){
    while(parent.firstChild){
        parent.removeChild(parent.firstChild)
    }
}

//Function that 
function buttonComands(button){
    classRemover(headerButtons, "selected")
    button.classList.add("class", "selected")
    searchBarInput.removeAttribute("disabled")
    searchBarInput.value = ""
    arrWordButton.removeAttribute("disabled")
    childRemover(divContainer)
}