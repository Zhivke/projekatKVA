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
  duration: number;          // Mapiramo sa API runTime
  actors: string[];
  price: number;             // Simuliramo
  projectionDates: string[]; // Generišemo
  reviews?: ReviewModel[];   // Hardcode
}

export interface ReviewModel {
  user: string;
  rating: number;
  comment: string;
  date?: string;
}