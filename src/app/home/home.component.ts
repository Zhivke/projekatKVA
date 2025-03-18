import { Component } from '@angular/core';
import { movieService } from '../../services/movie.service';
import { JsonPipe, CommonModule, NgIf, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AxiosError } from 'axios';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, NgIf, NgFor, MatCardModule, MatButtonModule, RouterModule, JsonPipe, LoadingComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  movie: any[] | null = null;
  error: string | null = null;
  movieRatings: { [key: number]: number } = {}; // Čuva ocene za svaki film

  constructor() {
    movieService.getMovie()
      .then(rsp => {
        this.movie = rsp.data;
        // Proverite da li je this.movie definisan pre iteracije
        if (this.movie) {
          this.movie.forEach(movie => {
            this.movieRatings[movie.movieId] = this.getRandomRating();
          });
        }
      })
      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`);
  }

  // Generiše random ocenu između 1 i 5
  getRandomRating(): number {
    const fractions = [0, 0.3, 0.5, 0.7]; // Mogući razlomci
    const randomFraction = fractions[Math.floor(Math.random() * fractions.length)]; // Nasumično bira razlomak
    return Math.floor(Math.random() * 5) + randomFraction; // Dodaje razlomak na celobrojni deo
  }

  // Vraća niz zvezdica na osnovu ocene
  getStars(rating: number): { filled: boolean, half: boolean }[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push({ filled: true, half: false }); // Puna zvezda
      } else if (i - 0.5 <= rating) {
        stars.push({ filled: false, half: true }); // Polu zvezda
      } else {
        stars.push({ filled: false, half: false }); // Prazna zvezda
      }
    }
    return stars;
  }
}