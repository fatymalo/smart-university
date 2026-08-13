import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings {

  profile = {
    nom: 'Administrateur',
    email: 'admin@smartuniversity.com',
    telephone: '+221 77 123 45 67',
    photo: 'https://i.pravatar.cc/150?img=12'
  };

  university = {
    nom: 'Smart University',
    adresse: '123 Avenue de l’Université',
    ville: 'Dakar',
    pays: 'Sénégal'
  };

  security = {
    ancien: '',
    nouveau: '',
    confirmation: ''
  };

  preferences = {
    darkMode: false,
    notifications: true,
    langue: 'Français',
    fuseau: 'Africa/Dakar'
  };

  enregistrer() {

    if (
      this.security.nouveau &&
      this.security.nouveau !== this.security.confirmation
    ) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    alert('Paramètres enregistrés avec succès.');

    this.security = {
      ancien: '',
      nouveau: '',
      confirmation: ''
    };

  }

}
