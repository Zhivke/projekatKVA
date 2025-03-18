import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieModel } from '../../models/movie.model';
import { movieService } from '../../services/movie.service';
import { NgIf } from '@angular/common';
import { LoadingComponent } from "../loading/loading.component";
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NgIf, LoadingComponent, MatCardModule, MatListModule, MatButtonModule, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})



export class DetailsComponent {

  public movie: MovieModel | null = null;

  public constructor(private route: ActivatedRoute) {
    route.params.subscribe(params => {
      const movieId = +params['id']; // Konvertujemo u broj
      movieService.getMovieById(movieId)
        .then(response => {
          const data = response.data;
          this.movie = {
            ...data,
            genre: Array.isArray(data.genre) ? data.genre.join(', ') : data.genre,
            director: data.director?.name || "Unknown",
            releaseDate: new Date(data.releaseDate).toLocaleDateString('sr-RS'),
          };
        })
        .catch(error => {
          console.error("Error fetching movie:", error);
        });
    });
  }
}
