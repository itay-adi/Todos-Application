import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ItemsComponent } from './components/items/items.component';
import { ListEditComponent } from './components/list-edit/list-edit.component';
import { ListInfoComponent } from './components/list-info/list-info.component';
import { ListsComponent } from './components/lists/lists.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'lists', component: ListsComponent},
  { path: 'lists/:id', component: ListInfoComponent},
  { path: 'lists/:id/edit', component: ListEditComponent},
  { path: 'items', component: ItemsComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
