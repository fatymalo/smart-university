import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Schedule {
  id: string;
  cours: string;
  enseignant: string;
  filiere: string;
  niveau: string;
  salle: string;
  jour: string;
  heure: string;
}

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './schedules.html',
  styleUrl: './schedules.css'
})
export class Schedules {

  schedules: Schedule[] = [

    {
      id: 'EMP001',
      cours: 'Programmation Java',
      enseignant: 'M. Ndiaye',
      filiere: 'Informatique',
      niveau: 'Licence 3',
      salle: 'B101',
      jour: 'Lundi',
      heure: '08:00 - 10:00'
    },

    {
      id: 'EMP002',
      cours: 'Marketing',
      enseignant: 'Mme Fall',
      filiere: 'Gestion',
      niveau: 'Master 1',
      salle: 'A203',
      jour: 'Mardi',
      heure: '10:00 - 12:00'
    },

    {
      id: 'EMP003',
      cours: 'Droit Civil',
      enseignant: 'M. Diop',
      filiere: 'Droit',
      niveau: 'Licence 2',
      salle: 'C110',
      jour: 'Mercredi',
      heure: '14:00 - 16:00'
    },

    {
      id: 'EMP004',
      cours: 'Anatomie',
      enseignant: 'Dr Ba',
      filiere: 'Médecine',
      niveau: 'Master 2',
      salle: 'M301',
      jour: 'Jeudi',
      heure: '09:00 - 11:00'
    },

    {
      id: 'EMP005',
      cours: 'Base de données',
      enseignant: 'M. Sarr',
      filiere: 'Informatique',
      niveau: 'Licence 2',
      salle: 'B205',
      jour: 'Vendredi',
      heure: '08:00 - 10:00'
    },

    {
      id: 'EMP006',
      cours: 'Réseaux informatiques',
      enseignant: 'Mme Diouf',
      filiere: 'Informatique',
      niveau: 'Licence 3',
      salle: 'B203',
      jour: 'Mardi',
      heure: '14:00 - 16:00'
    }

  ];

  searchTerm = '';
  selectedFiliere = '';
  selectedNiveau = '';
  selectedJour = '';

  showModal = false;
  showDetails = false;

  isEditing = false;

  selectedSchedule: Schedule | null = null;

  newSchedule: Schedule = this.createEmptySchedule();

  private createEmptySchedule(): Schedule {
    return {
      id: '',
      cours: '',
      enseignant: '',
      filiere: '',
      niveau: '',
      salle: '',
      jour: '',
      heure: ''
    };
  }

  get filteredSchedules(): Schedule[] {

    return this.schedules.filter(emploi => {

      const search = this.searchTerm.toLowerCase().trim();

      const matchesSearch =
        !search ||
        emploi.cours.toLowerCase().includes(search) ||
        emploi.enseignant.toLowerCase().includes(search) ||
        emploi.salle.toLowerCase().includes(search) ||
        emploi.id.toLowerCase().includes(search);

      const matchesFiliere =
        !this.selectedFiliere ||
        emploi.filiere === this.selectedFiliere;

      const matchesNiveau =
        !this.selectedNiveau ||
        emploi.niveau === this.selectedNiveau;

      const matchesJour =
        !this.selectedJour ||
        emploi.jour === this.selectedJour;

      return (
        matchesSearch &&
        matchesFiliere &&
        matchesNiveau &&
        matchesJour
      );

    });

  }

  get totalSchedules(): number {
    return this.schedules.length;
  }

  get totalFiliere(): number {
    return new Set(this.schedules.map(s => s.filiere)).size;
  }

  get totalTeachers(): number {
    return new Set(this.schedules.map(s => s.enseignant)).size;
  }

  get totalRooms(): number {
    return new Set(this.schedules.map(s => s.salle)).size;
  }

  ouvrirModal(): void {

    this.isEditing = false;

    this.newSchedule = {
      ...this.createEmptySchedule(),
      id: this.generateId()
    };

    this.showModal = true;
  }

  fermerModal(): void {
    this.showModal = false;
  }

  enregistrer(): void {

    if (
      !this.newSchedule.cours ||
      !this.newSchedule.enseignant ||
      !this.newSchedule.filiere ||
      !this.newSchedule.niveau ||
      !this.newSchedule.salle ||
      !this.newSchedule.jour ||
      !this.newSchedule.heure
    ) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    if (this.isEditing) {

      const index = this.schedules.findIndex(
        emploi => emploi.id === this.newSchedule.id
      );

      if (index !== -1) {
        this.schedules[index] = {
          ...this.newSchedule
        };
      }

    } else {

      this.schedules.push({
        ...this.newSchedule
      });

    }

    this.fermerModal();
    this.newSchedule = this.createEmptySchedule();
  }

  modifier(id: string): void {

    const emploi = this.schedules.find(
      schedule => schedule.id === id
    );

    if (!emploi) {
      return;
    }

    this.isEditing = true;

    this.newSchedule = {
      ...emploi
    };

    this.showModal = true;
  }

  voir(id: string): void {

    const emploi = this.schedules.find(
      schedule => schedule.id === id
    );

    if (!emploi) {
      return;
    }

    this.selectedSchedule = emploi;
    this.showDetails = true;
  }

  fermerDetails(): void {
    this.showDetails = false;
    this.selectedSchedule = null;
  }

  supprimer(id: string): void {

    const emploi = this.schedules.find(
      schedule => schedule.id === id
    );

    if (!emploi) {
      return;
    }

    const confirmation = confirm(
      `Voulez-vous vraiment supprimer l'emploi du temps "${emploi.cours}" ?`
    );

    if (confirmation) {

      this.schedules = this.schedules.filter(
        schedule => schedule.id !== id
      );

    }

  }

  resetFilters(): void {
    this.searchTerm = '';
    this.selectedFiliere = '';
    this.selectedNiveau = '';
    this.selectedJour = '';
  }

  private generateId(): string {

    const number = this.schedules.length + 1;

    return `EMP${number.toString().padStart(3, '0')}`;
  }

}
