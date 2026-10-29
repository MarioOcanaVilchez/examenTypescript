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
function idDesdeUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? Number.parseInt(match[1], 10) : 0;
}

function pintaPokemon(pokemon: PokemonTipo) {
  const id = idDesdeUrl(pokemon.pokemon.url);
  return `<div class="pokemonSinCargar">
    <h2 class="${claseColor(id)} ${claseRotacion(id)}">${pokemon.pokemon.name}</h2>
  </div>`;
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
<header class="app-header">
  <h1>Pokemons</h1>
  <div class="status-list">
    <p${pokemon != null ? '' : ' class="ErrorCargando"'}>${pokemon != null ? pokemon.name : 'No se ha podido cargar'}</p>
    <p${pokemon2 != null ? '' : ' class="ErrorCargando"'}>${pokemon2 != null ? pokemon2.name : 'No se ha podido cargar'}</p>
    <p${pokemon3 != null ? '' : ' class="ErrorCargando"'}>${pokemon3 != null ? pokemon3.name : 'No se ha podido cargar'}</p>
  </div>
</header>

<section class="controls-wrapper" aria-label="Buscar por tipo">
  <select id="selector1" class="field">
    <option value="1" selected>Normal</option>
    <option value="2">fighting</option>
    <option value="3">flying</option>
    <option value="4">poison</option>
    <option value="5">ground</option>
    <option value="6">rock</option>
    <option value="7">bug</option>
    <option value="8">ghost</option>
  </select>
  <select id="selector2" class="field">
    <option value="1">Normal</option>
    <option value="2" selected>fighting</option>
    <option value="3">flying</option>
    <option value="4">poison</option>
    <option value="5">ground</option>
    <option value="6">rock</option>
    <option value="7">bug</option>
    <option value="8">ghost</option>
  </select>
  <button id="BuscarTipo" class="btn btn-primary">Buscar por tipo</button>
  <button id="BuscaDosTipo" class="btn">Buscar 2 tipos a la vez</button>
</section>

<section class="controls-wrapper" aria-label="Buscar pokemon">
  <input type="text" id="pokemonBuscar" class="field" placeholder="Pokemon a buscar">
  <button id="BuscarPokemon" class="btn btn-primary">Buscar pokemon</button>
  <button id="compararPokemonsPeso" class="btn">Comparar dos pokemons por peso</button>
</section>

<div id="data"></div>
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

const NUM_COLORES = 6;
const NUM_ROTACIONES = 6;


function claseRotacion(id: number): string {
  return `poke-rotate-${((id * 7 + 3) % NUM_ROTACIONES) + 1}`;
}

function claseColor(id: number): string {
  return `poke-color-${(id % NUM_COLORES) + 1}`;
}




