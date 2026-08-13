import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Course {
  code: string;
  nom: string;
  filiere: string;
  semestre: string;
  enseignant: string;
  credits: number;
  salle: string;
  statut: 'Disponible' | 'Complet';
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class Courses {

  // =====================================================
  // LISTE DES COURS
  // =====================================================

  courses: Course[] = [

    {
      code: 'INFO101',
      nom: 'Programmation Java',
      filiere: 'Informatique',
      semestre: 'S1',
      enseignant: 'Mamadou Diop',
      credits: 6,
      salle: 'B101',
      statut: 'Disponible'
    },

    {
      code: 'INFO205',
      nom: 'Développement Web',
      filiere: 'Informatique',
      semestre: 'S2',
      enseignant: 'Aminata Ndiaye',
      credits: 5,
      salle: 'A204',
      statut: 'Disponible'
    },

    {
      code: 'INFO301',
      nom: 'Intelligence Artificielle',
      filiere: 'Informatique',
      semestre: 'S5',
      enseignant: 'Cheikh Sarr',
      credits: 6,
      salle: 'B203',
      statut: 'Disponible'
    },

    {
      code: 'GEST301',
      nom: 'Comptabilité Générale',
      filiere: 'Gestion',
      semestre: 'S3',
      enseignant: 'Cheikh Fall',
      credits: 4,
      salle: 'C302',
      statut: 'Complet'
    },

    {
      code: 'GEST401',
      nom: 'Management des Organisations',
      filiere: 'Gestion',
      semestre: 'S4',
      enseignant: 'Awa Ndiaye',
      credits: 5,
      salle: 'C204',
      statut: 'Disponible'
    },

    {
      code: 'DRT102',
      nom: 'Droit Civil',
      filiere: 'Droit',
      semestre: 'S1',
      enseignant: 'Fatou Ba',
      credits: 3,
      salle: 'D110',
      statut: 'Disponible'
    },

    {
      code: 'DRT301',
      nom: 'Droit des Affaires',
      filiere: 'Droit',
      semestre: 'S5',
      enseignant: 'Moussa Diop',
      credits: 5,
      salle: 'D205',
      statut: 'Complet'
    },

    {
      code: 'MED201',
      nom: 'Anatomie Humaine',
      filiere: 'Médecine',
      semestre: 'S2',
      enseignant: 'Dr Abdou Ba',
      credits: 6,
      salle: 'M301',
      statut: 'Disponible'
    }

  ];


  // =====================================================
  // RECHERCHE ET FILTRES
  // =====================================================

  searchTerm = '';

  selectedFiliere = '';

  selectedSemestre = '';

  selectedStatut = '';


  // =====================================================
  // MODAL AJOUT / MODIFICATION
  // =====================================================

  showModal = false;

  isEditing = false;


  // =====================================================
  // MODAL DETAILS
  // =====================================================

  showDetailsModal = false;

  selectedCourse: Course | null = null;


  // =====================================================
  // NOUVEAU COURS
  // =====================================================

  newCourse: Course = this.createEmptyCourse();


  // =====================================================
  // CREATION OBJET VIDE
  // =====================================================

  private createEmptyCourse(): Course {

    return {
      code: '',
      nom: '',
      filiere: '',
      semestre: '',
      enseignant: '',
      credits: 0,
      salle: '',
      statut: 'Disponible'
    };

  }


  // =====================================================
  // COURS FILTRES
  // =====================================================

  get filteredCourses(): Course[] {

    const search = this.searchTerm
      .toLowerCase()
      .trim();

    return this.courses.filter(course => {

      const matchesSearch =
        !search ||
        course.code.toLowerCase().includes(search) ||
        course.nom.toLowerCase().includes(search) ||
        course.enseignant.toLowerCase().includes(search) ||
        course.salle.toLowerCase().includes(search);

      const matchesFiliere =
        !this.selectedFiliere ||
        course.filiere === this.selectedFiliere;

      const matchesSemestre =
        !this.selectedSemestre ||
        course.semestre === this.selectedSemestre;

      const matchesStatut =
        !this.selectedStatut ||
        course.statut === this.selectedStatut;

      return (
        matchesSearch &&
        matchesFiliere &&
        matchesSemestre &&
        matchesStatut
      );

    });

  }


  // =====================================================
  // STATISTIQUES
  // =====================================================

  get totalCourses(): number {

    return this.courses.length;

  }


  get totalCredits(): number {

    return this.courses.reduce(
      (total, course) => total + course.credits,
      0
    );

  }


  get totalTeachers(): number {

    return new Set(
      this.courses.map(course => course.enseignant)
    ).size;

  }


  get availableCourses(): number {

    return this.courses.filter(
      course => course.statut === 'Disponible'
    ).length;

  }


  // =====================================================
  // OUVRIR MODAL AJOUT
  // =====================================================

  ouvrirModal(): void {

    this.isEditing = false;

    this.newCourse = {
      ...this.createEmptyCourse(),
      code: this.generateCode()
    };

    this.showModal = true;

  }


  // =====================================================
  // FERMER MODAL
  // =====================================================

  fermerModal(): void {

    this.showModal = false;

    this.isEditing = false;

    this.newCourse = this.createEmptyCourse();

  }


  // =====================================================
  // ENREGISTRER
  // =====================================================

  enregistrerCours(): void {

    // Validation

    if (
      !this.newCourse.code.trim() ||
      !this.newCourse.nom.trim() ||
      !this.newCourse.filiere ||
      !this.newCourse.semestre ||
      !this.newCourse.enseignant.trim() ||
      !this.newCourse.credits ||
      !this.newCourse.salle.trim()
    ) {

      alert(
        'Veuillez remplir tous les champs obligatoires.'
      );

      return;

    }


    // MODIFICATION

    if (this.isEditing) {

      const index = this.courses.findIndex(
        course => course.code === this.newCourse.code
      );

      if (index !== -1) {

        this.courses[index] = {
          ...this.newCourse
        };

      }

      this.fermerModal();

      return;

    }


    // VERIFIER CODE EXISTANT

    const exists = this.courses.some(
      course =>
        course.code.toLowerCase() ===
        this.newCourse.code.toLowerCase()
    );

    if (exists) {

      alert(
        'Un cours avec ce code existe déjà.'
      );

      return;

    }


    // AJOUT

    this.courses = [
      ...this.courses,
      {
        ...this.newCourse
      }
    ];


    this.fermerModal();

  }


  // =====================================================
  // MODIFIER
  // =====================================================

  modifierCours(code: string): void {

    const course = this.courses.find(
      item => item.code === code
    );

    if (!course) {
      return;
    }

    this.isEditing = true;

    this.newCourse = {
      ...course
    };

    this.showModal = true;

  }


  // =====================================================
  // VOIR DETAILS
  // =====================================================

  voirCours(code: string): void {

    const course = this.courses.find(
      item => item.code === code
    );

    if (!course) {
      return;
    }

    this.selectedCourse = course;

    this.showDetailsModal = true;

  }


  // =====================================================
  // FERMER DETAILS
  // =====================================================

  fermerDetails(): void {

    this.showDetailsModal = false;

    this.selectedCourse = null;

  }


  // =====================================================
  // SUPPRIMER
  // =====================================================

  supprimerCours(code: string): void {

    const course = this.courses.find(
      item => item.code === code
    );

    if (!course) {
      return;
    }

    const confirmation = confirm(
      `Voulez-vous vraiment supprimer "${course.nom}" ?`
    );

    if (!confirmation) {
      return;
    }

    this.courses = this.courses.filter(
      item => item.code !== code
    );

  }


  // =====================================================
  // RESET FILTRES
  // =====================================================

  resetFilters(): void {

    this.searchTerm = '';

    this.selectedFiliere = '';

    this.selectedSemestre = '';

    this.selectedStatut = '';

  }


  // =====================================================
  // GENERER CODE
  // =====================================================

  private generateCode(): string {

    let number = this.courses.length + 1;

    let code = `COUR${number
      .toString()
      .padStart(3, '0')}`;

    while (
      this.courses.some(
        course => course.code === code
      )
    ) {

      number++;

      code = `COUR${number
        .toString()
        .padStart(3, '0')}`;

    }

    return code;

  }

}
