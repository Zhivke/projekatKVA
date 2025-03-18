import { Component } from '@angular/core';
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

@Component({
  selector: 'app-signup',
  imports: [MatCardModule, NgFor, RouterLink, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatSelectModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  public movieList: string[] = [];
  public email = '';
  public password = '';
  public repeatPassword = '';
  public firstName = '';
  public lastName = '';
  public phone = '';
  public address = '';
  public favoriteGenre = '';

  public constructor(private router: Router) {
    movieService.getMovie()
      .then(rsp => this.movieList = rsp.data);
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
