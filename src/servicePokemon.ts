import type { Pokemon } from "./typesPokemon";

const URL_BASE:string = 'https://pokeapi.co/api/v2/pokemon/';


export async function getPokemons<Pokemon>(urls:string[]):Promise<Pokemon[]>{
    let promesas:Promise<Pokemon>[] = urls.map((url) => getPokemon<Pokemon>(url));
    return Promise.all(promesas);
}

export async function getPokemon<Pokemon>(url:string):Promise<Pokemon>{
    var response = await fetch(`${url}`);
    if (!response.ok){
        console.log(`Error http ${response.status}`);
        throw new Error(`Error http ${response.status}`);
    }
    return response.json() as Pokemon;
}

export async function getPokemonIntentos<Pokemon>(url:string,intentos:number):Promise<Pokemon | null>{
    for(let i:number = 0;i < intentos; i++ ){
        try{
    var response = await fetch(`${URL_BASE}${url}`);
    if (!response.ok){
        console.log(`Error http ${response.status}`);
        throw new Error(`Error http ${response.status}`);
    }
    return response.json() as Pokemon;
}catch(error){
setTimeout(() => '',1000);
}
}
console.log('Intentos maximos superados');
return null;
}

export async function getPokemonTiempo(url:string,tiempo:number):Promise<Pokemon | null>{
    let pokemon:Pokemon | null = null;
    setTimeout(async () => pokemon = await getPokemonIntentos(url,3), tiempo);
    return pokemon;
}