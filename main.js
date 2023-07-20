const pokemonName = document.querySelector(".pokemon__name");
const pokemonNumber = document.querySelector(".pokemon__number");
const pokemonImage = document.querySelector(".pokemon__image");
const pokemonHeight = document.querySelector(".pokemon__height");
const pokemonWeight = document.querySelector(".pokemon__weight");
const pokemonTypeOne = document.querySelector(".pokemon__typeOne");
const pokemonTypeTwo = document.querySelector(".pokemon__typeTwo");

const input = document.querySelector(".input__search");
const form = document.querySelector(".form");

const fetchPokemon = async (pokemon) => {

    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIresponse.status == 200) {
        const data = await APIresponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = "Loading...";
    pokemonNumber.innerHTML = "";
    pokemonTypeTwo.innerHTML = "";
    
    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data["sprites"]["other"]["official-artwork"]["front_default"];
        pokemonImage.style.display = "inline";
        pokemonHeight.innerHTML = data.height;
        pokemonWeight.innerHTML = data.weight;
        pokemonTypeOne.innerHTML = data["types"]["0"]["type"]["name"];
        input.value = "";
        pokemonTypeTwo.innerHTML = data["types"]["1"]["type"]["name"];
    } else {
        pokemonName.innerHTML = "Not found";
        pokemonNumber.innerHTML = "";
        pokemonImage.style.display = "none";
        pokemonHeight.innerHTML = "?";
        pokemonWeight.innerHTML = "?";
        pokemonTypeOne.innerHTML = "?";
        pokemonTypeTwo.innerHTML = "";
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

renderPokemon("1")
