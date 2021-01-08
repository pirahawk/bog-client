import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleDisplayComponent } from './bog-components/article-display.component';
import { ArticleListComponent } from './bog-components/article-list.component';
import { ErrorDisplayComponent } from './bog-components/error-display.component';
import { GetArticleListResolver } from './route-resolvers/get-article-list-resolver';
import { GetArticleResolver } from './route-resolvers/get-article-resolver';

const routes: Routes = [
  {
    path: 'article/:contentId',
    component: ArticleDisplayComponent,
    resolve: {
      articleContent: GetArticleResolver
    }
  },
  {
    path: 'article/:contentId/:title',
    component: ArticleDisplayComponent,
    resolve: {
      articleContent: GetArticleResolver
    }
  },
  {
    path: ':page',
    component: ArticleListComponent,
    resolve: {
      articlesList: GetArticleListResolver
    }
  },
  { path: '', redirectTo: '/0', pathMatch: 'full' },

  { path: 'error/:errorId', component: ErrorDisplayComponent },

  { path: '**', redirectTo: 'error/404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
