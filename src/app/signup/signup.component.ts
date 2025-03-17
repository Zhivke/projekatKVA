import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { movieService } from '../../services/movie.service'; // Ispravan import
// import { UserService } from '../../services/user.service'; // Ako nemaš userService, ovo izbaci

@Component({
  selector: 'app-signup',
  imports: [
    MatCardModule, NgFor, RouterLink, MatFormFieldModule, MatInputModule, 
    FormsModule, MatButtonModule, MatSelectModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  public movieList: any[] = []  // Promenili smo naziv promenljive iz destinationList u movieList
  public email = ''
  public password = ''
  public repeatPassword = ''
  public firstName = ''
  public lastName = ''
  public phone = ''
  public address = ''
  public favouriteMovie = ''  // Umesto destinacije

  public constructor(private router: Router) {
    movieService.getMovie()
      .then(rsp => this.movieList = rsp.data)  // OVO ĆE RADITI AKO API VRATI LISTU FILMOVA
      .catch(err => console.error("Error fetching movies:", err)) // Dodaj error handling
  }

  public doSignup() {
    if (this.email == '' || this.password == '') {
      alert('Email and password are required fields')
      return
    }

    if (this.password !== this.repeatPassword) {
      alert('Passwords don\'t match')
      return
    }

    // Pošto nemaš userService, treba ti alternativni način za kreiranje korisnika
    console.log("User data:", {
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      address: this.address,
      favouriteMovie: this.favouriteMovie
    })

    // OVO JE SIMULACIJA - ZAVISI OD TOGA KAKO REGISTRUJEŠ KORISNIKE U TVOM SISTEMU
    this.router.navigate(['/login']) 
  }
}
