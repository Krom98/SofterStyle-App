import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'formulaire',
    loadChildren: () => import('./formulaire/formulaire.module').then( m => m.FormulairePageModule)
  },
  {
    path: 'list-details',
    loadChildren: () => import('./list-details/list-details.module').then( m => m.ListDetailsPageModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./list-details/list-details.module').then( m => m.ListDetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
