import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.html',
  styleUrl: './reports.css'
})
export class Reports {

  reports = [
    {
      title: 'Rapport des étudiants',
      description: 'Liste complète et statistiques des étudiants',
      icon: 'bi-people',
      type: 'Étudiants',
      date: '14 Août 2026',
      format: 'PDF'
    },
    {
      title: 'Rapport des enseignants',
      description: 'Informations et statistiques du personnel enseignant',
      icon: 'bi-person-workspace',
      type: 'Enseignants',
      date: '14 Août 2026',
      format: 'PDF'
    },
    {
      title: 'Rapport des absences',
      description: 'Suivi des absences et des présences',
      icon: 'bi-calendar-x',
      type: 'Présences',
      date: '13 Août 2026',
      format: 'Excel'
    },
    {
      title: 'Rapport académique',
      description: 'Résultats et performances académiques',
      icon: 'bi-mortarboard',
      type: 'Académique',
      date: '12 Août 2026',
      format: 'PDF'
    },
    {
      title: 'Rapport financier',
      description: 'État des paiements et des frais de scolarité',
      icon: 'bi-cash-stack',
      type: 'Finance',
      date: '10 Août 2026',
      format: 'Excel'
    },
    {
      title: 'Rapport des inscriptions',
      description: 'Évolution des inscriptions universitaires',
      icon: 'bi-file-earmark-person',
      type: 'Inscriptions',
      date: '08 Août 2026',
      format: 'PDF'
    }
  ];

  telechargerRapport(report: any) {
    alert(`Téléchargement du rapport : ${report.title}`);
  }

  imprimerRapport(report: any) {
    alert(`Impression du rapport : ${report.title}`);
  }
}
