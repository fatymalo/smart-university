import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Grade {
  id: string;
  etudiant: string;
  cours: string;
  filiere: string;
  niveau: string;
  cc: number;
  devoir: number;
  examen: number;
  moyenne: number;
  mention: string;
}

interface NewGrade {
  id: string;
  etudiant: string;
  cours: string;
  filiere: string;
  niveau: string;
  cc: number;
  devoir: number;
  examen: number;
}

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './grades.html',
  styleUrl: './grades.css'
})
export class Grades {

  // =========================================================
  // DONNÉES
  // =========================================================

  grades: Grade[] = [
    {
      id: 'N001',
      etudiant: 'Ahmed Diallo',
      cours: 'Programmation Java',
      filiere: 'Informatique',
      niveau: 'Licence 3',
      cc: 15,
      devoir: 14,
      examen: 16,
      moyenne: 15,
      mention: 'Très Bien'
    },
    {
      id: 'N002',
      etudiant: 'Fatima Ndiaye',
      cours: 'Marketing',
      filiere: 'Gestion',
      niveau: 'Master 1',
      cc: 13,
      devoir: 15,
      examen: 14,
      moyenne: 14,
      mention: 'Très Bien'
    },
    {
      id: 'N003',
      etudiant: 'Mariam Ba',
      cours: 'Droit Civil',
      filiere: 'Droit',
      niveau: 'Licence 2',
      cc: 11,
      devoir: 12,
      examen: 13,
      moyenne: 12,
      mention: 'Bien'
    },
    {
      id: 'N004',
      etudiant: 'Ousmane Fall',
      cours: 'Anatomie',
      filiere: 'Médecine',
      niveau: 'Master 2',
      cc: 18,
      devoir: 17,
      examen: 19,
      moyenne: 18,
      mention: 'Excellent'
    }
  ];

  // =========================================================
  // RECHERCHE / FILTRES
  // =========================================================

  searchTerm = '';
  selectedFiliere = '';
  selectedNiveau = '';

  // =========================================================
  // MODAL
  // =========================================================

  showModal = false;
  isEditing = false;
  editingId: string | null = null;

  // =========================================================
  // NOUVELLE NOTE
  // =========================================================

  newGrade: NewGrade = this.createEmptyGrade();

  // =========================================================
  // CRÉER UNE NOTE VIDE
  // =========================================================

  private createEmptyGrade(): NewGrade {
    return {
      id: '',
      etudiant: '',
      cours: '',
      filiere: '',
      niveau: '',
      cc: 0,
      devoir: 0,
      examen: 0
    };
  }

  // =========================================================
  // LISTE FILTRÉE
  // =========================================================

  get filteredGrades(): Grade[] {

    const search = this.searchTerm
      .toLowerCase()
      .trim();

    return this.grades.filter(note => {

      const matchesSearch =
        !search ||
        note.id.toLowerCase().includes(search) ||
        note.etudiant.toLowerCase().includes(search) ||
        note.cours.toLowerCase().includes(search);

      const matchesFiliere =
        !this.selectedFiliere ||
        note.filiere === this.selectedFiliere;

      const matchesNiveau =
        !this.selectedNiveau ||
        note.niveau === this.selectedNiveau;

      return (
        matchesSearch &&
        matchesFiliere &&
        matchesNiveau
      );
    });
  }

  // =========================================================
  // STATISTIQUES
  // =========================================================

  get totalNotes(): number {
    return this.grades.length;
  }

  get moyenneGenerale(): number {

    if (this.grades.length === 0) {
      return 0;
    }

    const total = this.grades.reduce(
      (sum, note) => sum + note.moyenne,
      0
    );

    return Number(
      (total / this.grades.length).toFixed(2)
    );
  }

  get notesReussies(): number {
    return this.grades.filter(
      note => note.moyenne >= 10
    ).length;
  }

  get tauxReussite(): number {

    if (this.grades.length === 0) {
      return 0;
    }

    return Math.round(
      (this.notesReussies / this.grades.length) * 100
    );
  }

  get excellentesNotes(): number {
    return this.grades.filter(
      note => note.moyenne >= 16
    ).length;
  }

  // =========================================================
  // OUVRIR MODAL - NOUVELLE NOTE
  // =========================================================

  ouvrirModal(): void {

    this.isEditing = false;
    this.editingId = null;

    this.newGrade = this.createEmptyGrade();

    this.newGrade.id = this.generateId();

    this.showModal = true;
  }

  // =========================================================
  // FERMER MODAL
  // =========================================================

  fermerModal(): void {

    this.showModal = false;

    this.isEditing = false;

    this.editingId = null;

    this.newGrade = this.createEmptyGrade();
  }

  // =========================================================
  // ENREGISTRER
  // =========================================================

  enregistrer(): void {

    // Vérification des champs
    if (
      !this.newGrade.id.trim() ||
      !this.newGrade.etudiant.trim() ||
      !this.newGrade.cours.trim() ||
      !this.newGrade.filiere ||
      !this.newGrade.niveau
    ) {

      alert(
        'Veuillez remplir tous les champs obligatoires.'
      );

      return;
    }

    const cc = Number(this.newGrade.cc);
    const devoir = Number(this.newGrade.devoir);
    const examen = Number(this.newGrade.examen);

    // Vérification des notes
    if (
      cc < 0 || cc > 20 ||
      devoir < 0 || devoir > 20 ||
      examen < 0 || examen > 20
    ) {

      alert(
        'Les notes doivent être comprises entre 0 et 20.'
      );

      return;
    }

    // Calcul moyenne
    const moyenne = Number(
      ((cc + devoir + examen) / 3).toFixed(2)
    );

    // Calcul mention
    const mention = this.getMention(moyenne);

    // =====================================================
    // MODIFICATION
    // =====================================================

    if (this.isEditing && this.editingId) {

      const index = this.grades.findIndex(
        note => note.id === this.editingId
      );

      if (index !== -1) {

        this.grades[index] = {
          id: this.newGrade.id,
          etudiant: this.newGrade.etudiant.trim(),
          cours: this.newGrade.cours.trim(),
          filiere: this.newGrade.filiere,
          niveau: this.newGrade.niveau,
          cc,
          devoir,
          examen,
          moyenne,
          mention
        };
      }

      alert('Note modifiée avec succès.');

    }

    // =====================================================
    // AJOUT
    // =====================================================

    else {

      const existe = this.grades.some(
        note =>
          note.id.toLowerCase() ===
          this.newGrade.id.toLowerCase()
      );

      if (existe) {

        alert(
          'Cet identifiant existe déjà.'
        );

        return;
      }

      this.grades.push({
        id: this.newGrade.id.trim(),
        etudiant: this.newGrade.etudiant.trim(),
        cours: this.newGrade.cours.trim(),
        filiere: this.newGrade.filiere,
        niveau: this.newGrade.niveau,
        cc,
        devoir,
        examen,
        moyenne,
        mention
      });

      alert('Note ajoutée avec succès.');
    }

    this.fermerModal();
  }

  // =========================================================
  // CALCUL MENTION
  // =========================================================

  private getMention(moyenne: number): string {

    if (moyenne >= 16) {
      return 'Excellent';
    }

    if (moyenne >= 14) {
      return 'Très Bien';
    }

    if (moyenne >= 12) {
      return 'Bien';
    }

    if (moyenne >= 10) {
      return 'Passable';
    }

    return 'Échec';
  }

  // =========================================================
  // VOIR
  // =========================================================

  voir(id: string): void {

    const note = this.grades.find(
      grade => grade.id === id
    );

    if (!note) {
      return;
    }

    alert(
      `DÉTAILS DE LA NOTE\n\n` +
      `Étudiant : ${note.etudiant}\n` +
      `Cours : ${note.cours}\n` +
      `Filière : ${note.filiere}\n` +
      `Niveau : ${note.niveau}\n\n` +
      `CC : ${note.cc}/20\n` +
      `Devoir : ${note.devoir}/20\n` +
      `Examen : ${note.examen}/20\n\n` +
      `Moyenne : ${note.moyenne}/20\n` +
      `Mention : ${note.mention}`
    );
  }

  // =========================================================
  // MODIFIER
  // =========================================================

  modifier(id: string): void {

    const note = this.grades.find(
      grade => grade.id === id
    );

    if (!note) {
      return;
    }

    this.isEditing = true;
    this.editingId = id;

    this.newGrade = {
      id: note.id,
      etudiant: note.etudiant,
      cours: note.cours,
      filiere: note.filiere,
      niveau: note.niveau,
      cc: note.cc,
      devoir: note.devoir,
      examen: note.examen
    };

    this.showModal = true;
  }

  // =========================================================
  // SUPPRIMER
  // =========================================================

  supprimer(id: string): void {

    const note = this.grades.find(
      grade => grade.id === id
    );

    if (!note) {
      return;
    }

    const confirmation = confirm(
      `Voulez-vous vraiment supprimer la note de ${note.etudiant} ?`
    );

    if (confirmation) {

      this.grades = this.grades.filter(
        grade => grade.id !== id
      );
    }
  }

  // =========================================================
  // RÉINITIALISER
  // =========================================================

  resetFilters(): void {

    this.searchTerm = '';
    this.selectedFiliere = '';
    this.selectedNiveau = '';
  }

  // =========================================================
  // GÉNÉRER ID
  // =========================================================

  private generateId(): string {

    let number = this.grades.length + 1;

    let id = `N${number
      .toString()
      .padStart(3, '0')}`;

    while (
      this.grades.some(
        note => note.id === id
      )
    ) {

      number++;

      id = `N${number
        .toString()
        .padStart(3, '0')}`;
    }

    return id;
  }
}
