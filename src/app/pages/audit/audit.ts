import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AuditLog {
  id: number;
  user: string;
  action: string;
  module: string;
  date: string;
  ip: string;
  status: string;
}

@Component({
  selector: 'app-audit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './audit.html',
  styleUrl: './audit.css'
})
export class Audit {

  searchTerm = '';
  selectedModule = 'Tous';

  auditLogs: AuditLog[] = [
    {
      id: 1,
      user: 'Admin',
      action: 'Connexion',
      module: 'Authentification',
      date: '14/08/2026 08:45',
      ip: '192.168.1.10',
      status: 'Succès'
    },
    {
      id: 2,
      user: 'Ahmed Diallo',
      action: 'Modification',
      module: 'Étudiants',
      date: '14/08/2026 09:12',
      ip: '192.168.1.15',
      status: 'Succès'
    },
    {
      id: 3,
      user: 'Fatima Ndiaye',
      action: 'Ajout',
      module: 'Enseignants',
      date: '14/08/2026 09:30',
      ip: '192.168.1.20',
      status: 'Succès'
    },
    {
      id: 4,
      user: 'Admin',
      action: 'Suppression',
      module: 'Utilisateurs',
      date: '14/08/2026 10:05',
      ip: '192.168.1.10',
      status: 'Succès'
    },
    {
      id: 5,
      user: 'Admin',
      action: 'Tentative de connexion',
      module: 'Authentification',
      date: '14/08/2026 10:22',
      ip: '192.168.1.50',
      status: 'Échec'
    }
  ];

  get filteredLogs(): AuditLog[] {
    return this.auditLogs.filter(log => {
      const matchesSearch =
        log.user.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        log.module.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesModule =
        this.selectedModule === 'Tous' ||
        log.module === this.selectedModule;

      return matchesSearch && matchesModule;
    });
  }

  get totalActions(): number {
    return this.auditLogs.length;
  }

  get successfulActions(): number {
    return this.auditLogs.filter(log => log.status === 'Succès').length;
  }

  get failedActions(): number {
    return this.auditLogs.filter(log => log.status === 'Échec').length;
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedModule = 'Tous';
  }
}
