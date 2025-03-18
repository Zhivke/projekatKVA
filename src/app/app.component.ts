import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router'; 
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'projekatKVA';

  public service = UserService

  public constructor(private router: Router) {}

  
  public doLogout() {
    localStorage.removeItem('active')
    this.router.navigate(['/login']).then(()=>{
      window.location.reload();
    });
  }
}
