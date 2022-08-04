export interface Pokemon {
  attack:    number;
  defense:   number;
  hp:        number;
  id:        number;
  id_author:  1;
  image:     string;
  name:      string;
  type:      string;
}

export interface CreatePokemonDTO extends Omit<Pokemon, 'id' | 'id_author'> {
  idAuthor: number;
}

export interface UpdatePokemonDTO extends Omit<Pokemon, 'id' | 'id_author'> {}

