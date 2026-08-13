import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Teacher {
  id: string;
  nom: string;
  departement: string;
  grade: string;
  telephone: string;
  email: string;
  statut: string;
  photo: string;
}

@Component({
  selector: 'app-teachers',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './teachers.html',
  styleUrl: './teachers.css'
})
export class Teachers {

  // =========================================================
  // DONNÉES
  // =========================================================

  teachers: Teacher[] = [

    {
      id: 'ENS001',
      nom: 'Mamadou Diop',
      departement: 'Informatique',
      grade: 'Professeur',
      telephone: '77 111 22 33',
      email: 'm.diop@mail.com',
      statut: 'Actif',
      photo: 'https://i.pravatar.cc/150?img=12'
    },

    {
      id: 'ENS002',
      nom: 'Aminata Ndiaye',
      departement: 'Gestion',
      grade: 'Maître de conférences',
      telephone: '78 222 33 44',
      email: 'aminata@mail.com',
      statut: 'Actif',
      photo: 'https://i.pravatar.cc/150?img=32'
    },

    {
      id: 'ENS003',
      nom: 'Cheikh Fall',
      departement: 'Droit',
      grade: 'Assistant',
      telephone: '76 555 66 77',
      email: 'fall@mail.com',
      statut: 'Suspendu',
      photo: 'https://i.pravatar.cc/150?img=18'
    },

    {
      id: 'ENS004',
      nom: 'Fatou Ba',
      departement: 'Médecine',
      grade: 'Professeur',
      telephone: '70 888 99 00',
      email: 'fatou@mail.com',
      statut: 'Actif',
      photo: 'https://i.pravatar.cc/150?img=47'
    }

  ];

  // =========================================================
  // RECHERCHE / FILTRES
  // =========================================================

  searchTerm = '';

  selectedDepartement = '';

  selectedGrade = '';

  selectedStatut = '';

  // =========================================================
  // MODAL
  // =========================================================

  showModal = false;

  isEditing = false;

  editingId: string | null = null;

  // =========================================================
  // PROFIL
  // =========================================================

  showProfileModal = false;

  selectedTeacher: Teacher | null = null;

  // =========================================================
  // NOUVEL ENSEIGNANT
  // =========================================================

  newTeacher: Teacher = this.createEmptyTeacher();

  // =========================================================
  // CRÉER UN ENSEIGNANT VIDE
  // =========================================================

  private createEmptyTeacher(): Teacher {

    return {
      id: '',
      nom: '',
      departement: '',
      grade: '',
      telephone: '',
      email: '',
      statut: 'Actif',
      photo: 'https://i.pravatar.cc/150'
    };

  }

  // =========================================================
  // LISTE FILTRÉE
  // =========================================================

  get filteredTeachers(): Teacher[] {

    const search = this.searchTerm
      .toLowerCase()
      .trim();

    return this.teachers.filter(teacher => {

      const matchesSearch =
        !search ||
        teacher.id.toLowerCase().includes(search) ||
        teacher.nom.toLowerCase().includes(search) ||
        teacher.email.toLowerCase().includes(search) ||
        teacher.telephone.toLowerCase().includes(search);

      const matchesDepartement =
        !this.selectedDepartement ||
        teacher.departement === this.selectedDepartement;

      const matchesGrade =
        !this.selectedGrade ||
        teacher.grade === this.selectedGrade;

      const matchesStatut =
        !this.selectedStatut ||
        teacher.statut === this.selectedStatut;

      return (
        matchesSearch &&
        matchesDepartement &&
        matchesGrade &&
        matchesStatut
      );

    });

  }

  // =========================================================
  // STATISTIQUES
  // =========================================================

  get totalTeachers(): number {

    return this.teachers.length;

  }

  get activeTeachers(): number {

    return this.teachers.filter(
      teacher => teacher.statut === 'Actif'
    ).length;

  }

  get suspendedTeachers(): number {

    return this.teachers.filter(
      teacher => teacher.statut === 'Suspendu'
    ).length;

  }

  get professors(): number {

    return this.teachers.filter(
      teacher => teacher.grade === 'Professeur'
    ).length;

  }

  // =========================================================
  // OUVRIR MODAL AJOUT
  // =========================================================

  ouvrirModal(): void {

    this.isEditing = false;

    this.editingId = null;

    this.newTeacher = this.createEmptyTeacher();

    this.newTeacher.id = this.generateId();

    this.showModal = true;

  }

  // =========================================================
  // FERMER MODAL
  // =========================================================

  fermerModal(): void {

    this.showModal = false;

    this.isEditing = false;

    this.editingId = null;

    this.newTeacher = this.createEmptyTeacher();

  }

  // =========================================================
  // ENREGISTRER
  // =========================================================

  enregistrerTeacher(): void {

    // Validation
    if (
      !this.newTeacher.id.trim() ||
      !this.newTeacher.nom.trim() ||
      !this.newTeacher.departement ||
      !this.newTeacher.grade ||
      !this.newTeacher.telephone.trim() ||
      !this.newTeacher.email.trim()
    ) {

      alert(
        'Veuillez remplir tous les champs obligatoires.'
      );

      return;

    }

    // Validation email
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.newTeacher.email)) {

      alert(
        'Veuillez saisir une adresse email valide.'
      );

      return;

    }

    // =====================================================
    // MODIFICATION
    // =====================================================

    if (this.isEditing && this.editingId) {

      const index = this.teachers.findIndex(
        teacher => teacher.id === this.editingId
      );

      if (index !== -1) {

        this.teachers[index] = {
          ...this.newTeacher
        };

        alert(
          'Enseignant modifié avec succès.'
        );

      }

    }

    // =====================================================
    // AJOUT
    // =====================================================

    else {

      const existe = this.teachers.some(
        teacher =>
          teacher.id.toLowerCase() ===
          this.newTeacher.id.toLowerCase()
      );

      if (existe) {

        alert(
          'Ce matricule existe déjà.'
        );

        return;

      }

      this.teachers.push({
        ...this.newTeacher
      });

      alert(
        'Enseignant ajouté avec succès.'
      );

    }

    this.fermerModal();

  }

  // =========================================================
  // VOIR PROFIL
  // =========================================================

  voirTeacher(id: string): void {

    const teacher = this.teachers.find(
      item => item.id === id
    );

    if (!teacher) {
      return;
    }

    this.selectedTeacher = teacher;

    this.showProfileModal = true;

  }

  // =========================================================
  // FERMER PROFIL
  // =========================================================

  fermerProfile(): void {

    this.showProfileModal = false;

    this.selectedTeacher = null;

  }

  // =========================================================
  // MODIFIER
  // =========================================================

  modifierTeacher(id: string): void {

    const teacher = this.teachers.find(
      item => item.id === id
    );

    if (!teacher) {
      return;
    }

    this.isEditing = true;

    this.editingId = id;

    this.newTeacher = {
      ...teacher
    };

    this.showModal = true;

  }

  // =========================================================
  // SUPPRIMER
  // =========================================================

  supprimerTeacher(id: string): void {

    const teacher = this.teachers.find(
      item => item.id === id
    );

    if (!teacher) {
      return;
    }

    const confirmation = confirm(
      `Voulez-vous vraiment supprimer ${teacher.nom} ?`
    );

    if (!confirmation) {
      return;
    }

    this.teachers = this.teachers.filter(
      item => item.id !== id
    );

  }

  // =========================================================
  // RESET FILTRES
  // =========================================================

  resetFilters(): void {

    this.searchTerm = '';

    this.selectedDepartement = '';

    this.selectedGrade = '';

    this.selectedStatut = '';

  }

  // =========================================================
  // GÉNÉRER MATRICULE
  // =========================================================

  private generateId(): string {

    let number = this.teachers.length + 1;

    let id = `ENS${number
      .toString()
      .padStart(3, '0')}`;

    while (
      this.teachers.some(
        teacher => teacher.id === id
      )
    ) {

      number++;

      id = `ENS${number
        .toString()
        .padStart(3, '0')}`;

    }

    return id;

  }

}
