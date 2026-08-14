import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  constructor(private readonly router: Router) {}

  seDeconnecter() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }

}
