const pokemoContainer = document.querySelector('.pokemon-container')


// Hace el llamado al EndPoint pokedex/national
/*  function endPointNational(id){
    fetch(`https://pokeapi.co/api/v2/pokemon-species/1`)
    // fetch(`https://pokeapi.co/api/v2/pokedex/national`)
   // fetch(`https://pokeapi.co/api/v2/pokemon/11`)
   // fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
   //fetch(`https://pokeapi.co/api/v2/type/3`)
  //  .then((res) => res.json())
//    .then((data) => console.log(data))
    
    // .then((data) => {createPokemonteste(data.pokemon_entries);})
    //.then((data) => {cargaPokemonesLS(data);})
    // .then((data) => {getAllPokemon(data);})
    //.then((data) => {getAllPokemon();})
    //.then((data) => {getNational(data);})
    // .then((data) => console.log(data.pokemon_entries.pokemon_species.name))
    ;
   }  */


function endPointNational(id) {
    fetch(`https://pokeapi.co/api/v2/pokedex/national`)
        .then((res) => res.json())
        .then((data) => {
            cargaPokemonesLS(data);
        });
}

// Carga Pokemones al LocalStorage
function cargaPokemonesLS(poker) {
    localStorage.setItem("todosPokemones", JSON.stringify(poker));
}

// Carga más Pokemones : De 20 Unidades
var indiceInicial = 0;
var indiceFinal = 0;

function cargaMasPokemones(indiceBuscar) {

    var cantidadACargar = 20;
    var todosPokemones = JSON.parse(localStorage.getItem("todosPokemones"));
    var cantidadPokemones = todosPokemones.pokemon_entries.length;

    indiceFinal = indiceFinal + cantidadACargar;
    indiceInicial = indiceFinal - cantidadACargar;

    if (indiceBuscar == 1) {
        indiceFinal = cantidadACargar;
        indiceInicial = 0;
        resultado.innerHTML = '';
    }

    // Control limite de indice final
    if (indiceFinal > cantidadPokemones) {
        indiceFinal = cantidadPokemones;
        $("#lmbutton").hide()
    }

    listarCargaMasPokemones(todosPokemones, indiceInicial, indiceFinal);

}

// Lista los Pokemos a Cargar desde el Buscador
function listarCargaMasPokemones(poker, indiceInicial, indiceFinal) {

    for (var i = indiceInicial; i < indiceFinal; i++) {
        var counter = poker.pokemon_entries[i];
        // Crea Tarjetas de Pokemones
        creaTarjetaPokemon(counter);
    } //Cierra For

}


// Crea cada Tarjeta por Pokemon para listar
function creaTarjetaPokemon(counter) {
    // Define Card
    const card = document.createElement('div');
    card.classList.add('pokemon-block');

    // Define el id del pokemon
    const number = document.createElement('p');
    number.textContent = `${counter.entry_number.toString().padStart(3,0)}`;
    var idPokemon = number.textContent;

    // Define el nombre del pokemon
    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = counter.pokemon_species.name;

    // Define contenedor de imagen
    const imgContainer = document.createElement('div');
    imgContainer.classList.add('img-container');

    // Define ruta de imagen
    const imagenPequena = document.createElement('img');
    imagenPequena.src = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${idPokemon}.png`;
    imagenPequena.setAttribute('height', "250");

    // Define el boton
    const boton = document.createElement("button");
    boton.setAttribute('type', "button");
    boton.setAttribute('data-bs-toggle', "modal");
    boton.setAttribute('data-bs-target', "#modalPokemon");
    boton.setAttribute('class', "btn btn-danger");
    boton.innerHTML = "More Information";

    // Ingresa imagen al contenedor
    imgContainer.appendChild(imagenPequena);
    // Ingresa imagen a la Card
    card.appendChild(imgContainer);
    // Ingresa number a la Card    
    card.appendChild(number);
    // Ingresa name a la Card
    card.appendChild(name);
    // Ingresa boton a la Card
    card.appendChild(boton);
    //Ingresa card al Container
    pokemoContainer.appendChild(card);
}




/* Buscardor */

const formulario = document.querySelector('#buscadorbar');
const resultado = document.querySelector('#pokemoncontainer');

const buscar = () => {

    if (formulario.value == '') {
        cargaMasPokemones(1);
    } else {
        var todosPokemonesBuscar = JSON.parse(localStorage.getItem("todosPokemones"));

        resultado.innerHTML = '';

        // Llevo el valor a minusculas para comparar
        const texto = formulario.value.toLowerCase();


        for (var i = 0; i < todosPokemonesBuscar.pokemon_entries.length; i++) {
            var counter = todosPokemonesBuscar.pokemon_entries[i];
            console.log(counter.pokemon_species.name);
            console.log(counter.entry_number);

            let nombre = counter.pokemon_species.name.toLowerCase();

            if (nombre.indexOf(texto) !== -1) {

                // Crea Tarjetas de Pokemones
                creaTarjetaPokemon(counter);

            }
        } //Cierra For

        if (resultado.innerHTML === '') {
            resultado.innerHTML +=
                `<h1>No items found...</h1>`
        }

    }
}
/* Fin Buscador */




/* Acciones del Filtro por Type */
var boton = document.getElementById('boton');
var checks = document.querySelectorAll('.tipovalor');
var optionR = document.querySelectorAll('.generovalor');

    boton.addEventListener('click', function () {


    optionR.forEach((e) => {
        if (e.checked == true) {
            resultado.innerHTML = '';

        // Invocar EndPoint Tpye
        fetch(`https://pokeapi.co/api/v2/gender/${e.value}`)
            .then((res) => res.json())
            .then((data) => {
                logicaFiltrosGender(data);
            });
        }
        optionR.checked = false;
    });

    checks.forEach((e) => {
        if (e.checked == true) {
            resultado.innerHTML = '';

        // Invocar EndPoint Type
        fetch(`https://pokeapi.co/api/v2/type/${e.value}`)
            .then((res) => res.json())
            .then((data) => {
                logicaFiltrosType(data);
            });
        }
    });
});
/* Fin Acciones del Filtro por Type */


/* Logica Filtros por Tipo */
function logicaFiltrosType(data) {
    
    resultado.innerHTML = '';
    var todosPokemonesBuscar = JSON.parse(localStorage.getItem("todosPokemones"));

    for (var j = 0; j < data.pokemon.length; j++) {
        var counter = data.pokemon[j];
        var nombrePokemonFiltro = counter.pokemon.name.toLowerCase();
        //console.log(nombrePokemonFiltro);
        
            for (var i = 0; i < todosPokemonesBuscar.pokemon_entries.length; i++) {
                var counter = todosPokemonesBuscar.pokemon_entries[i];
    
                let nombrePokemonTodos = counter.pokemon_species.name.toLowerCase();
                
                if(nombrePokemonFiltro == nombrePokemonTodos)
                {
                    creaTarjetaPokemon(counter);
                }
            } // Cierrra For
    } // Cierra For
}    


/* Logica Filtros por Gender */
function logicaFiltrosGender(data) {
    
    resultado.innerHTML = '';
    var todosPokemonesBuscar = JSON.parse(localStorage.getItem("todosPokemones"));

    for (var j = 0; j < data.pokemon_species_details.length; j++) {
        var counter = data.pokemon_species_details[j];
        var nombrePokemonFiltroGen = counter.pokemon_species.name.toLowerCase();
        //console.log(nombrePokemonFiltro);
        
            for (var i = 0; i < todosPokemonesBuscar.pokemon_entries.length; i++) {
                var counter = todosPokemonesBuscar.pokemon_entries[i];
    
                let nombrePokemonTodos = counter.pokemon_species.name.toLowerCase();
                
                if(nombrePokemonFiltroGen == nombrePokemonTodos)
                {
                    creaTarjetaPokemon(counter);
                }
            } // Cierrra For
    } // Cierra For
}






// Arreglo por name y ID
formulario.addEventListener('keyup', buscar)




// Fin Codigo Buscador









// Inicializa consumiendo la API y listando por cargaMas
endPointNational();
cargaMasPokemones(1);

//filtrar();