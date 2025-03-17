import { Component } from '@angular/core';
import { movieService } from '../../services/movie.service';
import { JsonPipe, CommonModule, NgIf, NgFor } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AxiosError } from 'axios';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JsonPipe, CommonModule, NgIf, NgFor, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  movie: any[] | null = null;
  error: string | null = null;

  constructor() {
    movieService.getMovie()
      .then(rsp => this.movie = rsp.data)
      .catch((e: AxiosError) => this.error = `${e.code}: ${e.message}`);
  }
}
