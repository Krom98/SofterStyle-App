import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListDetailsPage } from './list-details.page';

const routes: Routes = [
  {
    path: '',
    component: ListDetailsPage
   }
  // {
  //   path: 'list-details',
  //   component: ListDetailsPage,
  //  // loadChildren: () => import('../list-details/list-details.module').then( m => m.ListDetailsPageModule)
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListDetailsPageRoutingModule {}
