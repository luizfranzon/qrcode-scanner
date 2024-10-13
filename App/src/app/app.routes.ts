import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'history',
    pathMatch: 'full',
  },
  {
    path: 'history',
    loadComponent: () =>
      import('./screens/history/history.page').then((m) => m.HistoryPage),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./screens/create/create.page').then((m) => m.CreatePage),
  },
];
