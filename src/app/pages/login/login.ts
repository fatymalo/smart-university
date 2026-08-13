import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';

  constructor(private readonly router: Router) {}

  seConnecter() {

    if (!this.email || !this.password) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    if (
      this.email === 'admin@smartuniversity.com' &&
      this.password === '123456'
    ) {

      localStorage.setItem('isLoggedIn', 'true');

      alert('Connexion réussie !');

      this.router.navigate(['/dashboard']);

    } else {

      alert('Email ou mot de passe incorrect.');

    }

  }

}
