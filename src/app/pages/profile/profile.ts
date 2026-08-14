import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {

  profile = {
    nom: 'MODOU SAMB',
    email: 'modou.samb@gmail.com',
    telephone: '77 123 45 67',
    role: 'Administrateur',
    departement: 'Informatique',
    matricule: 'ADM001'
  };

  modifierProfil() {
    alert('Profil modifié avec succès !');
  }

  changerPhoto() {
    alert('Fonction de changement de photo');
  }
}
