import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'bookmark',
    loadComponent: () => import('./bookmark/bookmark.component').then(c => c.BookmarkComponent)
  },
  {
    path: '',
    loadComponent: () => import('./homepage/homepage.component').then(c => c.HomePage)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
