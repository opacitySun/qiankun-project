import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './views/home/home.component';

const routes: Routes = [
  {
    path: `layout`,
    component: LayoutComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: '**', redirectTo: 'home'}
    ]
  },
  {
    path: '**',
    redirectTo: `layout`,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {}
}
