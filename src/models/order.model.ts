import { MovieModel } from "./movie.model";

export interface OrderModel {
    id: number;
    movie: MovieModel;
    screeningTime: string;
    seatCount: number;
    pricePerTicket: number;
    status: 'reserved' | 'watched' | 'canceled';
    rating: null | number;
}
