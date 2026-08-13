import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './library.html',
  styleUrl: './library.css'
})
export class Library {

  books = [

    {
      id: 'L001',
      titre: 'Introduction à Java',
      auteur: 'James Gosling',
      categorie: 'Programmation',
      annee: 2023,
      exemplaires: 12,
      statut: 'Disponible'
    },

    {
      id: 'L002',
      titre: 'Marketing Moderne',
      auteur: 'Philip Kotler',
      categorie: 'Gestion',
      annee: 2022,
      exemplaires: 8,
      statut: 'Disponible'
    },

    {
      id: 'L003',
      titre: 'Droit Civil',
      auteur: 'Jean Dupont',
      categorie: 'Droit',
      annee: 2021,
      exemplaires: 0,
      statut: 'Emprunté'
    },

    {
      id: 'L004',
      titre: 'Anatomie Humaine',
      auteur: 'Gray',
      categorie: 'Médecine',
      annee: 2024,
      exemplaires: 4,
      statut: 'Réservé'
    }

  ];

  showModal = false;

  newBook = {
    id: '',
    titre: '',
    auteur: '',
    categorie: '',
    annee: new Date().getFullYear(),
    exemplaires: 1,
    statut: 'Disponible'
  };

  ouvrirModal() {
    this.showModal = true;
  }

  fermerModal() {
    this.showModal = false;
  }

  enregistrerLivre() {

    this.books.push({
      ...this.newBook
    });

    this.newBook = {
      id: '',
      titre: '',
      auteur: '',
      categorie: '',
      annee: new Date().getFullYear(),
      exemplaires: 1,
      statut: 'Disponible'
    };

    this.showModal = false;

  }

  voir(id: string) {
    alert('Livre : ' + id);
  }

  modifier(id: string) {
    alert('Modifier : ' + id);
  }

  supprimer(id: string) {

    if (confirm('Voulez-vous supprimer ce livre ?')) {

      this.books = this.books.filter(
        livre => livre.id !== id
      );

    }

  }

  get totalLivres(): number {
    return this.books.length;
  }

  get disponibles(): number {
    return this.books.filter(
      l => l.statut === 'Disponible'
    ).length;
  }

  get empruntes(): number {
    return this.books.filter(
      l => l.statut === 'Emprunté'
    ).length;
  }

  get categories(): number {

    return new Set(
      this.books.map(l => l.categorie)
    ).size;

  }

}
