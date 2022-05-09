const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id,
            hp: result.stats[0].base_stat,
            atk: result.stats[1].base_stat,
            def: result.stats[2].base_stat,
            s_atk: result.stats[3].base_stat,
            s_def: result.stats[4].base_stat,
            spd: result.stats[5].base_stat,

        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li class="card">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">#${pokeman.id}. ${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
            <p class="card-subtitle"> hp: ${pokeman.hp} attack: ${pokeman.atk} defense: ${pokeman.def} 
            special-attack: ${pokeman.s_atk} special-defense: ${pokeman.s_def} speed: ${pokeman.spd} </p>
        </li>
    `
        )
        .join('');                              
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
