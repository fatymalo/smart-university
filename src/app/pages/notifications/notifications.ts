import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: string;
  date: string;
  read: boolean;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notifications.html',
  styleUrl: './notifications.css'
})
export class Notifications {

  searchTerm = '';
  selectedFilter = 'Toutes';

  notifications: Notification[] = [
    {
      id: 1,
      title: 'Nouvel étudiant inscrit',
      message: 'Ahmed Diallo a été ajouté à la liste des étudiants.',
      type: 'Étudiants',
      date: 'Aujourd’hui à 09:45',
      read: false
    },
    {
      id: 2,
      title: 'Nouveau paiement reçu',
      message: 'Un paiement de frais de scolarité a été enregistré.',
      type: 'Paiements',
      date: 'Aujourd’hui à 09:20',
      read: false
    },
    {
      id: 3,
      title: 'Planning mis à jour',
      message: 'L’emploi du temps du semestre a été modifié.',
      type: 'Planning',
      date: 'Aujourd’hui à 08:50',
      read: true
    },
    {
      id: 4,
      title: 'Nouveau message',
      message: 'Vous avez reçu un nouveau message d’un enseignant.',
      type: 'Messages',
      date: 'Hier à 17:30',
      read: false
    },
    {
      id: 5,
      title: 'Rapport disponible',
      message: 'Le rapport académique mensuel est maintenant disponible.',
      type: 'Rapports',
      date: 'Hier à 15:10',
      read: true
    },
    {
      id: 6,
      title: 'Mise à jour du système',
      message: 'Une nouvelle mise à jour de Smart University est disponible.',
      type: 'Système',
      date: '12/08/2026 à 11:25',
      read: true
    }
  ];

  get filteredNotifications(): Notification[] {
    return this.notifications.filter(notification => {

      const search = this.searchTerm.toLowerCase();

      const matchesSearch =
        notification.title.toLowerCase().includes(search) ||
        notification.message.toLowerCase().includes(search) ||
        notification.type.toLowerCase().includes(search);

      let matchesFilter = true;

      if (this.selectedFilter === 'Non lues') {
        matchesFilter = !notification.read;
      }

      if (this.selectedFilter === 'Lues') {
        matchesFilter = notification.read;
      }

      return matchesSearch && matchesFilter;
    });
  }

  get totalNotifications(): number {
    return this.notifications.length;
  }

  get unreadNotifications(): number {
    return this.notifications.filter(notification => !notification.read).length;
  }

  get readNotifications(): number {
    return this.notifications.filter(notification => notification.read).length;
  }

  markAsRead(notification: Notification): void {
    notification.read = true;
  }

  markAsUnread(notification: Notification): void {
    notification.read = false;
  }

  deleteNotification(id: number): void {
    this.notifications = this.notifications.filter(
      notification => notification.id !== id
    );
  }

  markAllAsRead(): void {
    this.notifications.forEach(notification => {
      notification.read = true;
    });
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedFilter = 'Toutes';
  }
}
