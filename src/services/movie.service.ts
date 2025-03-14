import axios, { Axios } from "axios";

export class movieService{
    static async getMovie(){
        return axios.get('https://movie.pequla.com/api/movie')
    }
}