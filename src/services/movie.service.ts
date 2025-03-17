import axios, { Axios } from "axios";

const client = axios.create({
    baseURL:'https://movie.pequla.com/api',
    headers:{
        'Accept':'application/json',
        'X-Client-Name':'KVA/2025'
    },
    validateStatus: (status: number) =>{
        return status === 200 
    }
})

export class movieService{
    static async getMovie(page: number = 0, size: number = 10){
        return client.request({
            url: '/movie',
            method: 'GET',
            params:{
                'page':page,
                'size': size,
            }
    })
    }
    static async getMovieById(id: number) {
        return client.get(`/movie/${id}`)
    }
}