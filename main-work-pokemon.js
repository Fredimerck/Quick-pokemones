const pokemoContainer  = document.querySelector('.pokemon-container')

 // Hace el llamado al EndPoint pokedex/national
function fetchPokemon(id){
 //fetch(`https://pokeapi.co/api/v2/pokedex/national`)
// fetch(`https://pokeapi.co/api/v2/pokemon/11`)
fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
 .then((res) => res.json())
 //.then((data) => console.log(data))
 .then((data) => {createPokemon(data);})
 ;
} 


/* function createPokemonteste(poker)
{
    alert(poker.name);
} */


function fetchPokemons(number){
    for (let i = 1; i <= number; i++){
        fetchPokemon(i);
    }
}


function createPokemon(pokemon){
    
    // Define Card
    const card = document.createElement('div');
    card.classList.add('pokemon-block');

    //Define SpriteContainer
     const spriteContainer = document.createElement('div');
     spriteContainer.classList.add('img-container');
    
    // NO USO: Toma la imagen desde el objeto
     const sprite = document.createElement('img');
     sprite.src = pokemon.sprites.front_default

     spriteContainer.appendChild(sprite);

    //Define el id del pokemon
    const number = document.createElement('p');
    //number.textContent = `#${pokemon.id};`
    number.textContent = `#${pokemon.id.toString().padStart(3,0)}`;

    //Define el nombre del pokemon
     const name = document.createElement('p');
     name.classList.add('name');
     name.textContent = pokemon.name

    //Ingresa el contenido en el card
    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);

    pokemoContainer.appendChild(card);

}

// Inicializa la carga de pokemones
fetchPokemons(9);


