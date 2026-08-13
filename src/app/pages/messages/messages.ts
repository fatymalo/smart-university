import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './messages.html',
  styleUrl: './messages.css'
})
export class Messages {

  contacts = [

    {
      id: 1,
      nom: 'Ahmed Diallo',
      poste: 'Étudiant',
      photo: 'https://i.pravatar.cc/60?img=11',
      online: true
    },

    {
      id: 2,
      nom: 'Fatima Ndiaye',
      poste: 'Enseignante',
      photo: 'https://i.pravatar.cc/60?img=15',
      online: false
    },

    {
      id: 3,
      nom: 'Ousmane Fall',
      poste: 'Directeur',
      photo: 'https://i.pravatar.cc/60?img=8',
      online: true
    },

    {
      id: 4,
      nom: 'Mariam Ba',
      poste: 'Comptable',
      photo: 'https://i.pravatar.cc/60?img=22',
      online: false
    }

  ];

  selectedContact = this.contacts[0];

  messages = [

    {
      sender: 'Ahmed Diallo',
      text: 'Bonjour Monsieur.',
      me: false,
      time: '08:30'
    },

    {
      sender: 'Moi',
      text: 'Bonjour Ahmed, comment allez-vous ?',
      me: true,
      time: '08:31'
    },

    {
      sender: 'Ahmed Diallo',
      text: 'Je voudrais des informations sur les inscriptions.',
      me: false,
      time: '08:32'
    }

  ];

  newMessage = '';

  choisirContact(contact: any) {
    this.selectedContact = contact;
  }

  envoyerMessage() {

    if (this.newMessage.trim() === '') {
      return;
    }

    this.messages.push({
      sender: 'Moi',
      text: this.newMessage,
      me: true,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })
    });

    this.newMessage = '';

  }

}
