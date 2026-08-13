import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { authGuard } from './guards/auth-guard';

import { Dashboard } from './pages/dashboard/dashboard';
import { Students } from './pages/students/students';
import { Teachers } from './pages/teachers/teachers';
import { Courses } from './pages/courses/courses';
import { Schedules } from './pages/schedules/schedules';
import { Grades } from './pages/grades/grades';
import { Payments } from './pages/payments/payments';
import { Library } from './pages/library/library';
import { Messages } from './pages/messages/messages';
import { Notifications } from './pages/notifications/notifications';
import { Reports } from './pages/reports/reports';
import { Audit } from './pages/audit/audit';
import { Profile } from './pages/profile/profile';
import { Settings } from './pages/settings/settings';


export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },


  {
    path: 'login',
    component: Login
  },


  {
    path: '',
    component: AdminLayout,

    children: [

      {
        path: 'dashboard',
        component: Dashboard,
        canActivate: [authGuard]
      },

       {
        path: 'students',
        component: Students,
        canActivate: [authGuard]
      },



      {
        path: 'teachers',
        component: Teachers,
        canActivate: [authGuard]
      },

      {
        path: 'courses',
        component: Courses,
        canActivate: [authGuard]
      },

      {
        path: 'schedules',
        component: Schedules,
        canActivate: [authGuard]
      },

      {
        path: 'grades',
        component: Grades,
        canActivate: [authGuard]
      },

      {
        path: 'payments',
        component: Payments,
        canActivate: [authGuard]
      },

      {
        path: 'library',
        component: Library,
        canActivate: [authGuard]
      },

      {
        path: 'messages',
        component: Messages,
        canActivate: [authGuard]
      },

      {
        path: 'notifications',
        component: Notifications,
        canActivate: [authGuard]
      },

      {
        path: 'reports',
        component: Reports,
        canActivate: [authGuard]
      },

      {
        path: 'audit',
        component: Audit,
        canActivate: [authGuard]
      },

      {
        path: 'profile',
        component: Profile,
        canActivate: [authGuard]
      },

      {
        path: 'settings',
        component: Settings,
        canActivate: [authGuard]
      }

    ]

  },


  {
    path: '**',
    redirectTo: 'login'
  }

];
