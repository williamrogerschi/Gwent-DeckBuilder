let factionDB = new Array
let raceDB = new Array
let typeDB = new Array
let interactionDB = new Array
let base = `http://localhost:3001/`

//global variables






window.addEventListener('DOMContentLoaded', async (event) => {
    event.preventDefault()
    console.log("Loading")

    factionDB = await axios.get(`http://localhost:3001/factions`)
    console.log(factionDB)
    let factions = factionDB.data
    const factionDropdownOptions = document.querySelector('#faction-card-picker')
    for (let i=0; i<factions.length; i++) {
        let factionName = factions[i].name
        let factionId = factions[i]._id
        factionDropdownOptions.innerHTML += `<option value="${factionId}">${factionName}</option><\n>`
    }

    //trying to log the selection//
    factionDropdownOptions.addEventListener('change', selectFaction)
            
    function selectFaction (event) {
    const faction = event.target.value
    document.getElementById('faction-choice').value = faction
}

    raceDB = await axios.get(`http://localhost:3001/races`) //FormData this is what we would do to get it onto our card local
    console.log(raceDB)
    let races = raceDB.data
    const raceDropdownOptions = document.querySelector(`#race-card-picker`)
    for (let i=0; i<races.length; i++) {
        let raceName = races[i].name
        let raceId = races[i]._id
        raceDropdownOptions.innerHTML += `<option value="${raceId}">${raceName}</option><\n>`
    }

   raceDropdownOptions.addEventListener('change', selectRace)
            
    function selectRace (event) {
    const race = event.target.value
    document.getElementById('race-choice').value = race
}


    typeDB = await axios.get(`http://localhost:3001/types`)
    console.log(typeDB)
    let types = typeDB.data
    const typeDropdownOptions = document.querySelector(`#type-card-picker`)
    for(let i=0; i<types.length; i++) {
        let typeName = types[i].name
        let typeId = types[i]._id
        typeDropdownOptions.innerHTML += `<option value="${typeId}">${typeName}</option><\n>`
    }

    typeDropdownOptions.addEventListener('change', selectType)
            
    function selectType (event) {
    const type = event.target.value
    document.getElementById('type-choice').value = type
}

    interactionDB = await axios.get(`http://localhost:3001/interactions`)
    console.log(interactionDB)
    let interaction = interactionDB.data
    const interactionDropdownOptions = document.querySelector(`#cf-card-picker`)
    for(let i=0; i<interaction.length; i++) {
        let interactionName = interaction[i].name
        let interactionId = interaction[i]._id
        interactionDropdownOptions.innerHTML += `<option value="${interactionId}">${interactionName}</option><\n>`
    }

    interactionDropdownOptions.addEventListener('change', selectInteraction)
            
    function selectInteraction (event) {
    const interaction = event.target.value
    document.getElementById('function-choice').value = interaction
}

    tagDB = await axios.get(`http://localhost:3001/tags`)
    console.log(tagDB)
    let tags = tagDB.data
    const tagDropdownOptions = document.querySelector(`#tag-card-picker`)
    for(let i=0; i<tags.length; i++) {
        let tagName = tags[i].name
        let tagId = tags[i]._id
        tagDropdownOptions.innerHTML += `<option value="${tagId}">${tagName}</option><\n>`
    }

    tagDropdownOptions.addEventListener('change', selectTag)
      
    let tagArray = []
    function selectTag(event) {
    const tag = event.target.value
    tagArray.push(tag)
    console.log(tagArray)

    // Join the tagArray into a comma-separated string for FormData
    const tagString = tagArray.join(',')

    document.getElementById('tag-choice').value = tagString
}
    // let tagArray = []
    // function selectTag (event) {
    // const tag = event.target.value
    // tagArray.push(tag)
    // console.log(tagArray)
    // document.getElementById('tag-choice').value = tagArray
    // }
})

// function for the dropdown for multiple tags being selected //
// document.addEventListener("DOMContentLoaded", function (event) {
//     event.preventDefault()
//     const dropdown = document.querySelector(".tag-card-picker")
//     const dropdownContent = dropdown.querySelector(".dropdown-content")
//     const checkboxes = dropdownContent.querySelectorAll("input[type='checkbox']")
//     const dropbtn = dropdown.querySelector(".dropbtn")
//     const selectedItems = []

//     dropbtn.addEventListener("click", function (event) {
//         event.preventDefault()
//         dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block"
//     })

//     checkboxes.forEach(function (checkbox) {
//         checkbox.addEventListener("change", function () {
//             const itemValue = checkbox.value
//             if (checkbox.checked) {
//                 selectedItems.push(itemValue)
//             } else {
//                 const index = selectedItems.indexOf(itemValue)
//                 if (index !== -1) {
//                     selectedItems.splice(index, 1)
//                 }
//             }
//             // Log the selected items
//             console.log("Selected items: " + selectedItems.join(", "))
//         })
//     })
//     // Close the dropdown when clicking outside
//     window.addEventListener("click", function (event) {
//         if (!event.target.matches('.dropbtn')) {
//             dropdownContent.style.display = 'none'
//         }
//     })
//     // Prevent closing the dropdown when clicking inside it
//     dropdownContent.addEventListener("click", function (event) {
//         event.stopPropagation()
//     })
// })





//function to submit my object to BACKEND//

async function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData(event.target);

    const name = data.get('card-name')
    const ability = data.get('freeform')
    const faction = data.get('faction-choice')
    const race = data.get('race-choice')
    const cardType = data.get('type-choice')
    const cardFunction = data.get('function-choice')
    const tag = data.get('tag-choice').split(',');
    // const tag = data.get('tag-choice')
    const power = data.get('card-power')
    const provision = data.get('card-provision')
    const imgURL = data.get('img-picker')

    console.log({ name, ability, faction, race, cardType, cardFunction, tag, power, provision, imgURL })
    console.log(data);


    try {
        const card = await axios.post(`http://localhost:3001/cards`, {
            name: name,
            faction: faction,
            race: race,
            cardFunction: cardFunction,
            ability: ability,
            tag: tag,
            cardType: cardType,
            power: power,
            provision: provision,
            imgURL: `https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80`
        })

        console.log(card)
    } catch (error) {
        console.error(error)
    }
}

const form = document.querySelector('.custom-card-editor')
form.addEventListener('submit', handleSubmit)
