import type { PokemonTipo, Type as Tipo} from "./typeTipo";

const URL_BASE = 'https://pokeapi.co/api/v2/type/';

export async function getTipo<Tipo>(url:string):Promise<Tipo>{
    var response = await fetch(`${URL_BASE}${url}`);
    if (!response.ok){
        console.log(`Error http ${response.status}`);
        throw new Error(`Error http ${response.status}`);
    }
    return response.json() as Tipo;
}
export async function getTipos(urls:string[]):Promise<Tipo[]>{
    let promesas:Promise<Tipo>[] = urls.map((url) => getTipo(url));
    return Promise.all(promesas);
}
export async function getPokemonTipo(url:string){
    let tipo:Tipo = await getTipo(url);
    let PokemonsTipo:PokemonTipo[] = [];
    tipo.pokemon.forEach((pokemon) => PokemonsTipo.push(pokemon));
    return PokemonsTipo;
}
export async function getPokemonTipos(urls:string[]){
    let tipos:Tipo[] = await getTipos(urls);
    let PokemonsTipo:PokemonTipo[] = [];
    tipos.forEach((tipo) => tipo.pokemon.forEach((pokemon) => PokemonsTipo.includes(pokemon) ? '' : PokemonsTipo.push(pokemon)));
    return PokemonsTipo;
}