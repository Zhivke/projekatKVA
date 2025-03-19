// search.component.ts
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { LoadingComponent } from "../loading/loading.component";
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { movieService } from '../../services/movie.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatTableModule,
    NgIf,
    NgFor,
    MatButtonModule,
    LoadingComponent,
    RouterLink,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatSelectModule
  ],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  displayedColumns: string[] = ['id', 'title', 'genre', 'duration', 'actions'];
  allData: any[] | null = null;
  dataSource: any[] | null = null;
  
  // Filteri
  userInput: string = '';
  selectedGenre: string | null = null;
  
  // Liste za select
  genreList: string[] = [];

  constructor() {
    movieService.getMovie()
      .then(rsp => {
        this.allData = this.formatMovies(rsp.data);
        this.dataSource = this.formatMovies(rsp.data);
        this.generateSearchCriteria(rsp.data);
      })
  }

  private formatMovies(movies: any[]): any[] {
    return movies.map(movie => ({
      ...movie,
      genresFormatted: movie.movieGenres.map((g: any) => g.genre.name).join(', ')
    }));
  }

  generateSearchCriteria(movies: any[]) {
    this.genreList = [...new Set(movies.flatMap(m => 
      m.movieGenres.map((g: any) => g.genre.name)
    ))];
  }

  doReset() {
    this.userInput = '';
    this.selectedGenre = null;
    this.dataSource = this.allData;
  }

  doFilterChain() {
    if (!this.allData) return;

    this.dataSource = this.allData.filter(movie => {
      const textMatch = this.userInput === '' || 
        movie.title.toLowerCase().includes(this.userInput.toLowerCase()) ||
        movie.movieId.toString().includes(this.userInput);

      const genreMatch = !this.selectedGenre || 
        movie.movieGenres.some((g: any) => g.genre.name === this.selectedGenre);

      return textMatch && genreMatch;
    });
  }
}