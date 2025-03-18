export interface MovieModel {
  id: number;
  title: string;
  originalTitle: string;
  genre: string;
  director: string;
  releaseDate: string;
  poster: string;
  description: string;
  shortDescription: string;
  duration: number; // Vreme trajanja filma
  actors: string[]; // Lista glumaca
}
