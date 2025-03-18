import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { movieService } from '../../services/movie.service'; 
import { UserService } from '../../services/user.service';
import { MovieModel } from '../../models/movie.model';

@Component({
  selector: 'app-signup',
  standalone: true,  // DODATO: Standalone komponenta
  imports: [
    CommonModule,  // DODATO: Omogućava osnovne Angular direktive (*ngFor, *ngIf)
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatButtonModule, 
    FormsModule,
    RouterLink
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  public movieList: MovieModel[] = []; 

  public email = '';
  public password = '';
  public repeatPassword = '';
  public firstName = '';
  public lastName = '';
  public phone = '';
  public address = '';
  public favoriteGenre = '';

  public genreList: string[] = [
    'Akcija', 'Drama', 'Komedija', 'Triler', 'Horor', 'Animirani', 'Sci-Fi', 'Romansa'
  ];

  public constructor(private router: Router) {
    movieService.getMovie().then((rsp: { data: MovieModel[] }) => {
      if (Array.isArray(rsp.data)) {
        this.movieList = rsp.data; 
      } else {
        console.error('getMovie() did not return an array');
      }
    }).catch((err: any) => console.error('Error fetching movies:', err));
  }

  public doSignup() {
    if (this.email === '' || this.password === '') {
      alert('Email and password are required fields');
      return;
    }

    if (this.password !== this.repeatPassword) {
      alert('Passwords don\'t match');
      return;
    }

    const result = UserService.createUser({
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      address: this.address,
      favoriteGenre: this.favoriteGenre,
      orders: []
    });

    result ? this.router.navigate(['/login']) : alert('Email is already taken');
  }
}
