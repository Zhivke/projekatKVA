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
      const movieId = +params['id'];
      movieService.getMovieById(movieId)
        .then(response => {
          const data = response.data;
          
          // Generisanje simuliranih podataka
          const projectionDates = this.generateProjectionDates(data.startDate);
          const price = this.generateRandomPrice(300, 600);
          
          this.movie = {
            ...data,
            genre: data.movieGenres.map((g: { genre: { name: string } }) => g.genre.name).join(', '),
            director: data.director?.name || "Nepoznato",
            releaseDate: new Date(data.startDate).toLocaleDateString('sr-RS'),
            actors: data.movieActors.map((ma: { actor: { name: string } }) => ma.actor.name),
            projectionDates: this.generateProjectionDates(data.startDate),
            price: this.generateRandomPrice(300, 600),
            duration: data.runTime
          };
        })
        .catch(error => {
          console.error("Error fetching movie:", error);
        });
    });
  }

  private generateProjectionDates(startDate: string): string[] {
    const dates = [];
    const baseDate = new Date(startDate);
    
    for(let i = 0; i < 5; i++) {
      const date = new Date(baseDate);
      date.setDate(date.getDate() + i);
      date.setHours(16 + i, 0, 0);
      dates.push(date.toLocaleString('sr-RS'));
    }
    
    return dates;
  }

  private generateRandomPrice(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public formatDuration(duration: number): string {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes.toString().padStart(2, '0')}min`;
  }
}