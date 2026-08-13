import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Sidebar } from '../../shared/sidebar/sidebar';
import { Navbar } from '../../shared/navbar/navbar';


@Component({
  selector: 'app-admin-layout',
  standalone: true,

  imports: [
    RouterOutlet,
    Sidebar,
    Navbar
  ],

  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})

export class AdminLayout {

}
