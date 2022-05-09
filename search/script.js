document.querySelector("#search").addEventListener("click", getPokemon);

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseName(string) {
  return string.toLowerCase();
}

function getPokemon(e) {
  const name = document.querySelector("#pokemonName").value;
  const pokemonName = lowerCaseName(name);

  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(".pokemonBox").innerHTML = `
      <div>
        <img
          src="${data.sprites.other["official-artwork"].front_default}"
          alt="Pokemon name"
        />
      </div>
      <div class="pokemonInfos">
        <h1>#${data.id}</h1>
        <h1>${capitalizeFirstLetter(data.name)}</h1>
        <p>hp: ${data.stats[0].base_stat}</p>
        <p>attack: ${data.stats[1].base_stat}</p>
        <p>defense: ${data.stats[2].base_stat}</p>
        <p>special-attack: ${data.stats[3].base_stat}</p>
        <p>special-defense: ${data.stats[4].base_stat}</p>
        <p>speed: ${data.stats[5].base_stat}</p>
        <p>Weight: ${data.weight}</p>
      </div>`;
    })
    .catch((err) => {
      document.querySelector(".pokemonBox").innerHTML = `
      <h4>That pokemon does not exist!</h4>
      `;
      console.log("Pokemon not found", err);
    });

  e.preventDefault();
}