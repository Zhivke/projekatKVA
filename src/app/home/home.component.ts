import { Component } from '@angular/core';
import { movieService } from '../../services/movie.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [JsonPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  movie: any[] | null = null

  constructor(){
    movieService.getMovie()
    .then(rsp => this.movie = rsp.data)
  }

}
