import { Component } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MovieModel } from '../../models/movie.model';
import { movieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-search',
  standalone: true,
  imports: [
    CommonModule,  // 👈 Dodaj ovo za *ngFor i | date
    FormsModule,   // 👈 Dodaj ovo za [(ngModel)]
    NgIf, 
    NgFor, 
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class MovieSearchComponent {
  displayedColumns: string[] = ['id', 'title', 'genre', 'director', 'releaseDate', 'actions'];
  allData: MovieModel[] | null = null;
  genreList: string[] = [];
  selectedGenre: string | null = null;
  dataSource: MovieModel[] | null = null;
  directorList: string[] = [];
  selectedDirector: string | null = null;
  userInput: string = '';
  dateOptions: string[] = [];
  selectedDate: string | null = null;

  constructor() {
    movieService.getMovie() // SADA POZIVAMO STATIC METODU
      .then((rsp: { data: MovieModel[] }) => {
        this.allData = rsp.data;
        this.dataSource = rsp.data;
        this.generateSearchCriteria(rsp.data);
      })
      .catch((error: any) => console.error('Error fetching movies:', error));
  }

  public generateSearchCriteria(source: MovieModel[]) {
    this.genreList = [...new Set(source.map(obj => obj.genre))];
    this.directorList = [...new Set(source.map(obj => obj.director))];
    this.dateOptions = [...new Set(source.map(obj => obj.releaseDate.split('T')[0]))];
  }

  public doReset() {
    this.userInput = '';
    this.selectedGenre = null;
    this.selectedDirector = null;
    this.selectedDate = null;
    this.dataSource = this.allData;
    if (this.allData) {
      this.generateSearchCriteria(this.allData);
    }
  }

  public doFilterChain() {
    if (!this.allData) return;

    this.dataSource = this.allData
      .filter(obj => {
        if (!this.userInput) return true;
        return obj.title.toLowerCase().includes(this.userInput.toLowerCase()) ||
               obj.id.toString().includes(this.userInput);
      })
      .filter(obj => !this.selectedGenre || obj.genre === this.selectedGenre)
      .filter(obj => !this.selectedDirector || obj.director === this.selectedDirector)
      .filter(obj => {
        if (!this.selectedDate) return true;
        const releaseDate = new Date(obj.releaseDate);
        const selectedDate = new Date(this.selectedDate);
        return releaseDate.toDateString() === selectedDate.toDateString();
      });

    this.generateSearchCriteria(this.dataSource);
  }

  public viewDetails(movie: MovieModel) {
    console.log('Viewing details for:', movie);
  }
}
