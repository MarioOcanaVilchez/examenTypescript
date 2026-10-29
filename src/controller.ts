import { getPokemonIntentos, getPokemons, getPokemonTiempo } from "./servicePokemon";
import { getPokemonTipo, getPokemonTipos } from "./serviceTipo";
import type { Pokemon } from "./typesPokemon";
import type { PokemonTipo } from "./typeTipo";

export async function buscarPokemonTipo(tipo:string):Promise<PokemonTipo[]>{
    return await getPokemonTipo(tipo);
}
export async function buscarPokemonTipos(tipos:string[]):Promise<PokemonTipo[]>{
    return await getPokemonTipos(tipos);
}
export async function buscarPokemonUrlDada(urls:string[]):Promise<Pokemon[]>{
    return await getPokemons(urls);
}
export async function buscaPokemonConIntentos(pokemon:string):Promise<Pokemon | null> {
    return getPokemonIntentos(pokemon,3);
}
export async function buscaPokemonConTiempo(pokemon:string):Promise<Pokemon | null> {
    return getPokemonTiempo(pokemon,3000);
}
