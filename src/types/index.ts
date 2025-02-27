export interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  url: string;
}

export interface CharacterResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Character[];
}
