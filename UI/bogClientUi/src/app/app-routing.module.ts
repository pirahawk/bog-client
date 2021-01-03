import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleDisplayComponent } from './bog-components/article-display.component';
import { ArticleListComponent } from './bog-components/article-list.component';
import { ErrorDisplayComponent } from './bog-components/error-display.component';
import { GetArticleListResolver } from './route-resolvers/get-article-list-resolver';

const routes: Routes = [
  {path: 'article/:contentId', component: ArticleDisplayComponent},
  {path: 'article/:contentId/:title', component: ArticleDisplayComponent},
  {
    path: ':page',
    component: ArticleListComponent,
    resolve: {
      articlesList: GetArticleListResolver
    }
  },
  {path: '', redirectTo: '/0', pathMatch: 'full'},
  {path: '**', component: ErrorDisplayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
