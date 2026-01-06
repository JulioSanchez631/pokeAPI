import { Pokemon } from "../models";

export const formateoPokemons = (pokemons : any) : Pokemon[] => {
  
  const pokemonsDatos = [ ...pokemons ];

  const pokemonsListos = pokemonsDatos.map(item => {

    const tipos = item.types.map((item2 : any) => {
      return item2.type.name;
    })

    const pokemon : Pokemon = {
      id: item.id,
      nombre: item.name,
      tipos: tipos,
      imgURL: item.sprites.front_default
    }

    console.log(pokemon);

    return pokemon;
  })

  return pokemonsListos;
}