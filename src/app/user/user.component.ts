import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { UserModel } from '../../models/user.model';
import { MatTableModule } from '@angular/material/table';
import { OrderModel } from '../../models/order.model';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { movieService } from '../../services/movie.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    NgIf,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatExpansionModule,
    MatAccordion,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule
],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  public displayedColumns: string[] = ['id', 'movie', 'seats', 'date', 'time', 'price', 'status', 'actions'];
  public user: UserModel | null = null;
  public userCopy: UserModel | null = null;
  public movieList: string[] = [];

  public oldPasswordValue = '';
  public newPasswordValue = '';
  public repeatPasswordValue = '';

  constructor(private router: Router) {
    if (!UserService.getActiveUser()) {
      router.navigate(['/home']);
      return;
    }

    this.user = UserService.getActiveUser();
    this.userCopy = UserService.getActiveUser();

    movieService.getMovie()
      .then(rsp => this.movieList = rsp.data);
  }

  public doChangePassword() {
    if (!this.oldPasswordValue || !this.newPasswordValue) {
      alert('Password cannot be empty');
      return;
    }

    if (this.newPasswordValue !== this.repeatPasswordValue) {
      alert('Passwords do not match');
      return;
    }

    if (this.oldPasswordValue !== this.user?.password) {
      alert('Old password is incorrect');
      return;
    }

    alert(
      UserService.changePassword(this.newPasswordValue) ?
        'Password has been changed' : 'Failed to change password'
    );

    this.oldPasswordValue = '';
    this.newPasswordValue = '';
    this.repeatPasswordValue = '';
  }

  public doUpdateUser() {
    if (!this.userCopy) {
      alert('User not defined');
      return;
    }

    UserService.updateUser(this.userCopy);
    this.user = UserService.getActiveUser();
    alert('Profile updated successfully');
  }

  public doChangeOrderStatus(state: 'reserved' | 'watched' | 'canceled', order: OrderModel) {
    if (UserService.changeOrderStatus(state, order.id)) {
      this.user = UserService.getActiveUser();
    }
  }

  public doCancel(orderId: number) {
    if (UserService.changeOrderStatus('canceled', orderId)) {
      // Osvježi podatke bez menjanja tipova
      this.user = JSON.parse(JSON.stringify(UserService.getActiveUser()));
    }
  }
  public doRating(order: OrderModel, rating: number) {
    if (UserService.changeRating(rating, order.id)) {
        this.user = UserService.getActiveUser();
    }
}

}
