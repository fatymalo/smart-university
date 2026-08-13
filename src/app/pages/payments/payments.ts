import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './payments.html',
  styleUrl: './payments.css'
})
export class Payments {

  payments = [

    {
      id: 'PAY001',
      etudiant: 'Ahmed Diallo',
      filiere: 'Informatique',
      niveau: 'Licence 3',
      montant: 350000,
      date: '20/07/2026',
      mode: 'Wave',
      statut: 'Payé'
    },

    {
      id: 'PAY002',
      etudiant: 'Fatima Ndiaye',
      filiere: 'Gestion',
      niveau: 'Master 1',
      montant: 420000,
      date: '18/07/2026',
      mode: 'Orange Money',
      statut: 'Payé'
    },

    {
      id: 'PAY003',
      etudiant: 'Mariam Ba',
      filiere: 'Droit',
      niveau: 'Licence 2',
      montant: 280000,
      date: '-',
      mode: '-',
      statut: 'Impayé'
    },

    {
      id: 'PAY004',
      etudiant: 'Ousmane Fall',
      filiere: 'Médecine',
      niveau: 'Master 2',
      montant: 650000,
      date: '19/07/2026',
      mode: 'Carte bancaire',
      statut: 'En attente'
    }

  ];

  showModal = false;

  newPayment = {

    id: '',
    etudiant: '',
    filiere: '',
    niveau: '',
    montant: 0,
    date: '',
    mode: '',
    statut: 'Payé'

  };

  ouvrirModal() {
    this.showModal = true;
  }

  fermerModal() {
    this.showModal = false;
  }

  enregistrerPaiement() {

    this.payments.push({
      ...this.newPayment
    });

    this.newPayment = {

      id: '',
      etudiant: '',
      filiere: '',
      niveau: '',
      montant: 0,
      date: '',
      mode: '',
      statut: 'Payé'

    };

    this.showModal = false;

  }

  voir(id: string) {
    alert('Paiement : ' + id);
  }

  modifier(id: string) {
    alert('Modifier : ' + id);
  }

  supprimer(id: string) {

    if (confirm('Voulez-vous supprimer ce paiement ?')) {

      this.payments = this.payments.filter(
        paiement => paiement.id !== id
      );

    }

  }

  get totalEncaisse(): number {
    return this.payments
      .filter(p => p.statut === 'Payé')
      .reduce((somme, p) => somme + p.montant, 0);
  }

  get totalImpayes(): number {
    return this.payments
      .filter(p => p.statut === 'Impayé').length;
  }

  get totalAttente(): number {
    return this.payments
      .filter(p => p.statut === 'En attente').length;
  }

}
