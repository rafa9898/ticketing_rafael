import { Routes } from '@angular/router';

export const routes: Routes = [

    {

        path: "",
        redirectTo: "catalog",
        pathMatch: 'full',

    },

    {

        path: "catalog",
        loadComponent: () => import('./pages/catalog/catalog.component').then(c => c.CatalogComponent),

    },

    {

        path: "sessions/:id",
        loadComponent: () => import('./pages/sessions/sessions.component').then(c => c.SessionsComponent),

    },

];
