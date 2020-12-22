import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ArticleDisplayComponent } from './bog-components/article-display.component';
import { ArticleListComponent } from './bog-components/article-list.component';
import { ErrorDisplayComponent } from './bog-components/error-display.component';

const routes: Routes = [
  {path:'article/:contentId', component: ArticleDisplayComponent},
  {path:'article/:contentId/:title', component: ArticleDisplayComponent},
  {path:':page', component: ArticleListComponent},
  {path:'', component: ArticleListComponent},
  {path:'**', component: ErrorDisplayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
