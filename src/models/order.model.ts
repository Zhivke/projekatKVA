import { MovieModel } from "./movie.model";

export interface OrderModel {
    id: number;
    movie: MovieModel;
    seatCount: number;
    pricePerTicket: number;
    status: 'reserved' | 'watched' | 'canceled';
    rating: null | number;
    
    // Novi atributi
    totalPrice?: number;
    movieTitle?: string;
    date?: string;
    time?: string;
}