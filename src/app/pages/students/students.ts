import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Student {
  id: string;
  nom: string;
  filiere: string;
  niveau: string;
  telephone: string;
  email: string;
  statut: 'Actif' | 'Suspendu';
  photo: string;
}

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './students.html',
  styleUrl: './students.css'
})
export class Students {

  students: Student[] = [

    {
      id: 'ET001',
      nom: 'Ahmed Diallo',
      filiere: 'Informatique',
      niveau: 'Licence 3',
      telephone: '77 111 22 33',
      email: 'ahmed@mail.com',
      statut: 'Actif',
      photo: 'https://i.pravatar.cc/100?img=11'
    },

    {
      id: 'ET002',
      nom: 'Fatima Ndiaye',
      filiere: 'Gestion',
      niveau: 'Master 1',
      telephone: '78 222 33 44',
      email: 'fatima@mail.com',
      statut: 'Actif',
      photo: 'https://i.pravatar.cc/100?img=15'
    },

    {
      id: 'ET003',
      nom: 'Mariam Ba',
      filiere: 'Droit',
      niveau: 'Licence 2',
      telephone: '76 555 66 77',
      email: 'mariam@mail.com',
      statut: 'Suspendu',
      photo: 'https://i.pravatar.cc/100?img=22'
    },

    {
      id: 'ET004',
      nom: 'Ousmane Fall',
      filiere: 'Médecine',
      niveau: 'Master 2',
      telephone: '70 888 99 00',
      email: 'ousmane@mail.com',
      statut: 'Actif',
      photo: 'https://i.pravatar.cc/100?img=8'
    },

    {
      id: 'ET005',
      nom: 'Awa Diop',
      filiere: 'Informatique',
      niveau: 'Licence 2',
      telephone: '76 123 45 67',
      email: 'awa@mail.com',
      statut: 'Actif',
      photo: 'https://i.pravatar.cc/100?img=47'
    },

    {
      id: 'ET006',
      nom: 'Ibrahima Sarr',
      filiere: 'Gestion',
      niveau: 'Licence 3',
      telephone: '77 345 67 89',
      email: 'ibrahima@mail.com',
      statut: 'Actif',
      photo: 'https://i.pravatar.cc/100?img=12'
    },

    {
      id: 'ET007',
      nom: 'Khady Fall',
      filiere: 'Droit',
      niveau: 'Master 1',
      telephone: '78 456 78 90',
      email: 'khady@mail.com',
      statut: 'Suspendu',
      photo: 'https://i.pravatar.cc/100?img=32'
    },

    {
      id: 'ET008',
      nom: 'Moussa Ndiaye',
      filiere: 'Médecine',
      niveau: 'Licence 3',
      telephone: '70 567 89 01',
      email: 'moussa@mail.com',
      statut: 'Actif',
      photo: 'https://i.pravatar.cc/100?img=13'
    }

  ];

  searchTerm = '';
  selectedFiliere = '';
  selectedNiveau = '';
  selectedStatut = '';

  showModal = false;
  showDetails = false;

  isEditing = false;

  selectedStudent: Student | null = null;

  newStudent: Student = this.createEmptyStudent();

  private createEmptyStudent(): Student {

    return {
      id: '',
      nom: '',
      filiere: '',
      niveau: '',
      telephone: '',
      email: '',
      statut: 'Actif',
      photo: 'https://i.pravatar.cc/100'
    };

  }

  /* =========================
     RECHERCHE + FILTRES
     ========================= */

  get filteredStudents(): Student[] {

    const search = this.searchTerm
      .toLowerCase()
      .trim();

    return this.students.filter(student => {

      const matchesSearch =
        !search ||
        student.id.toLowerCase().includes(search) ||
        student.nom.toLowerCase().includes(search) ||
        student.email.toLowerCase().includes(search) ||
        student.telephone.toLowerCase().includes(search);

      const matchesFiliere =
        !this.selectedFiliere ||
        student.filiere === this.selectedFiliere;

      const matchesNiveau =
        !this.selectedNiveau ||
        student.niveau === this.selectedNiveau;

      const matchesStatut =
        !this.selectedStatut ||
        student.statut === this.selectedStatut;

      return (
        matchesSearch &&
        matchesFiliere &&
        matchesNiveau &&
        matchesStatut
      );

    });

  }

  /* =========================
     STATISTIQUES
     ========================= */

  get totalStudents(): number {
    return this.students.length;
  }

  get activeStudents(): number {

    return this.students.filter(
      student => student.statut === 'Actif'
    ).length;

  }

  get suspendedStudents(): number {

    return this.students.filter(
      student => student.statut === 'Suspendu'
    ).length;

  }

  get totalPrograms(): number {

    return new Set(
      this.students.map(student => student.filiere)
    ).size;

  }

  /* =========================
     MODAL
     ========================= */

  ouvrirModal(): void {

    this.isEditing = false;

    this.newStudent = {
      ...this.createEmptyStudent(),
      id: this.generateStudentId()
    };

    this.showModal = true;

  }

  fermerModal(): void {
    this.showModal = false;
  }

  /* =========================
     ENREGISTREMENT
     ========================= */

  enregistrerEtudiant(): void {

    if (
      !this.newStudent.nom ||
      !this.newStudent.filiere ||
      !this.newStudent.niveau ||
      !this.newStudent.telephone ||
      !this.newStudent.email
    ) {

      alert('Veuillez remplir tous les champs obligatoires.');

      return;

    }

    if (this.isEditing) {

      const index = this.students.findIndex(
        student => student.id === this.newStudent.id
      );

      if (index !== -1) {

        this.students[index] = {
          ...this.newStudent
        };

      }

    } else {

      this.students.push({
        ...this.newStudent
      });

    }

    this.fermerModal();

    this.newStudent = this.createEmptyStudent();

  }

  /* =========================
     VOIR PROFIL
     ========================= */

  voirEtudiant(id: string): void {

    const student = this.students.find(
      student => student.id === id
    );

    if (!student) {
      return;
    }

    this.selectedStudent = student;

    this.showDetails = true;

  }

  fermerDetails(): void {

    this.showDetails = false;

    this.selectedStudent = null;

  }

  /* =========================
     MODIFIER
     ========================= */

  modifierEtudiant(id: string): void {

    const student = this.students.find(
      student => student.id === id
    );

    if (!student) {
      return;
    }

    this.isEditing = true;

    this.newStudent = {
      ...student
    };

    this.showModal = true;

  }

  /* =========================
     SUPPRIMER
     ========================= */

  supprimerEtudiant(id: string): void {

    const student = this.students.find(
      student => student.id === id
    );

    if (!student) {
      return;
    }

    const confirmation = confirm(
      `Voulez-vous vraiment supprimer l'étudiant ${student.nom} ?`
    );

    if (confirmation) {

      this.students = this.students.filter(
        etudiant => etudiant.id !== id
      );

    }

  }

  /* =========================
     RESET FILTRES
     ========================= */

  resetFilters(): void {

    this.searchTerm = '';
    this.selectedFiliere = '';
    this.selectedNiveau = '';
    this.selectedStatut = '';

  }

  /* =========================
     GENERER MATRICULE
     ========================= */

  private generateStudentId(): string {

    const number = this.students.length + 1;

    return `ET${number.toString().padStart(3, '0')}`;

  }

}
