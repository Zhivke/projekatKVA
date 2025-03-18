import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieModel } from '../../models/movie.model';
import { movieService } from '../../services/movie.service';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserService } from '../../services/user.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { OrderModel } from '../../models/order.model';

@Component({
  selector: 'app-order',
  imports: [MatCardModule, NgIf, NgFor, MatInputModule, MatButtonModule, MatSelectModule, MatFormFieldModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})

export class OrderComponent {
  public movie:MovieModel | null = null;
  public selectedTicketCount: number = 1;
  public selectedPrice: number = 300;

  constructor(private route: ActivatedRoute, private router: Router) {
    route.params.subscribe(params => {
      movieService.getMovieById(params['id'])
        .then(rsp => {
          this.movie = rsp.data;
        });
    });
  }
  
  public doOrder() {
    Swal.fire({
      title: `Rezervisati kartu za ${this.movie?.title}?`,
      text: "Rezervaciju možete otkazati bilo kada iz vašeg profila!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Da, rezerviši!"
    }).then((result: { isConfirmed: any; }) => {
      if (result.isConfirmed) {
        const newOrder: OrderModel = {
          id: new Date().getTime(),
          movie: this.movie!,
          seatCount: this.selectedTicketCount,
          pricePerTicket: this.selectedPrice,
          status: 'reserved',
          rating: null,
          
          // Novi podaci
          totalPrice: this.selectedTicketCount * this.selectedPrice,
          movieTitle: this.movie?.title,
          date: new Date().toLocaleDateString(),  // Simulirani datum
          time: "19:00"  // Pretpostavljena satnica, može se dinamički menjati
        };
  
        const result = UserService.createOrder(newOrder);
        if (result) {
          this.router.navigate(['/user']);
        } else {
          Swal.fire({
            title: "Neuspešna rezervacija",
            text: "Došlo je do greške!",
            icon: "error"
          });
        }
      }
    });
  }
}
