import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent {
  title = 'projekatKVA';
  constructor(private router: Router) {}
  public doLogout() {
    localStorage.removeItem('active')
    this.router.navigate(['/login'])
  }
}
