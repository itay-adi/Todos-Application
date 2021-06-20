import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ListsComponent } from './components/lists/lists.component';
import { CoreModule } from './core/core.module';
import { ListInfoComponent } from './components/list-info/list-info.component';
import { ListEditComponent } from './components/list-edit/list-edit.component';
import { ItemsComponent } from './components/items/items.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ErrorsPresenterComponent } from './components/errors-presenter/errors-presenter.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    ListsComponent,
    ListInfoComponent,
    ListEditComponent,
    ItemsComponent,
    PageNotFoundComponent,
    ErrorsPresenterComponent,
  ],
  imports: [
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
