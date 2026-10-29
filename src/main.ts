import { buscaPokemonConIntentos, buscaPokemonConTiempo, buscarPokemonTipo, buscarPokemonTipos } from './controller';
import { getPokemons } from './servicePokemon';
import './style.css'
import type { Pokemon } from './typesPokemon';
import type { PokemonTipo } from './typeTipo';


let pokemonsSinCargar:PokemonTipo[] = [];
let pokemon:Pokemon | null = await buscaPokemonConIntentos('Pokemon inventado');
let pokemon2:Pokemon | null = await buscaPokemonConIntentos('1');
let pokemon3:Pokemon | null = await buscaPokemonConTiempo('2');
console.log(pokemon != null ? pokemon : '');
console.log(pokemon2 != null ? pokemon2 : '');
function pintaPokemon(pokemon:PokemonTipo){
    return `<div class="pokemonSinCargar">
    <h2>${pokemon.pokemon.name}</h2>
    <div>`;
}

function pintaPokemons(pokemons:PokemonTipo[]){
    let resultado:string = '';
    pokemons.forEach((pokemon) => resultado += pintaPokemon(pokemon));
    document.querySelector<HTMLDivElement>('#data')!.innerHTML = resultado;
}
function pintaPokemonsPeso(pokemons:Pokemon[]){
    let resultado:string = pokemons.at(0)!.height > pokemons.at(1)!.height ? `<p>${pokemons.at(0)!.name} pesa mas que ${pokemons.at(1)!.name} (${pokemons.at(0)!.height} > ${pokemons.at(1)!.height})</p>` : `<p>${pokemons.at(1)!.name} pesa mas que ${pokemons.at(0)!.name} (${pokemons.at(1)!.height} > ${pokemons.at(0)!.height})</p>`;
    document.querySelector<HTMLDivElement>('#data')!.innerHTML = resultado;
}
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<p${pokemon != null ? '' : ' class="ErrorCargando"'}>${pokemon != null ? `${pokemon.name}` : 'No se ha podido cargar'}</p>
<p${pokemon2 != null ? '' : ' class="ErrorCargando"'}>${pokemon2 != null ? `${pokemon2.name}` : 'No se ha podido cargar'}</p>
<p${pokemon3 != null ? '' : ' class="ErrorCargando"'}>${pokemon3 != null ? `${pokemon3.name}` : 'No se ha podido cargar'}</p>
<h1>Pokemons</h1>
<select id="selector1">
      <option value="1" selected>Normal</option>
      <option value="2">fighting</option>
      <option value="3">flying</option>
      <option value="4">poison</option>
      <option value="5">ground</option>
      <option value="6">rock</option>
      <option value="7">bug</option>
      <option value="8">ghost</option>
    </select>
<select id="selector2">
      <option value="1">Normal</option>
      <option value="2" selected>fighting</option>
      <option value="3">flying</option>
      <option value="4">poison</option>
      <option value="5">ground</option>
      <option value="6">rock</option>
      <option value="7">bug</option>
      <option value="8">ghost</option>
    </select>
<button id="BuscarTipo">Buscar por tipo</button>
<button id="BuscaDosTipo">Buscar 2 tipos a la vez</button>
    <div id="data">
    </div>
    <input type="text" id="pokemonBuscar" placeholder="Pokemon a buscar">
    <button id="BuscarPokemon">Buscar pokemon</button>
    <button id="compararPokemonsPeso">Comparar dos pokemons por peso</button>
`;

document.querySelector<HTMLButtonElement>('#BuscarTipo')?.addEventListener('click', () => buscarPokemonPorTipo());
async function buscarPokemonPorTipo(){
    pokemonsSinCargar =  await buscarPokemonTipo(document.querySelector<HTMLSelectElement>('#selector1')!.value);
    pintaPokemons(pokemonsSinCargar);
}
document.querySelector<HTMLButtonElement>('#BuscarPokemon')?.addEventListener('click', () => buscarPokemon());
async function buscarPokemon(){
    let pokemonsPintar = pokemonsSinCargar.filter((pokemon) => pokemon.pokemon.name.toLowerCase().includes(document.querySelector<HTMLInputElement>('#pokemonBuscar')!.value.toLowerCase()));
    pintaPokemons(pokemonsPintar);
}
document.querySelector<HTMLButtonElement>('#compararPokemonsPeso')?.addEventListener('click',() => pintaComparaPokemonsPeso());
async function pintaComparaPokemonsPeso(){
    
    let pokemons:Pokemon[] = await getPokemons([pokemonsSinCargar.at(0)!.pokemon.url,pokemonsSinCargar.at(1)!.pokemon.url]);
    pintaPokemonsPeso(pokemons);
}
document.querySelector<HTMLButtonElement>('#BuscaDosTipo')?.addEventListener('click', () => buscarPokemonPor2Tipo());
async function buscarPokemonPor2Tipo(){
    pokemonsSinCargar =  await buscarPokemonTipos([document.querySelector<HTMLSelectElement>('#selector1')!.value,document.querySelector<HTMLSelectElement>('#selector2')!.value]);
    pintaPokemons(pokemonsSinCargar);
}




