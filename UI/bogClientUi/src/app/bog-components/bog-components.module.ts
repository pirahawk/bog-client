import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './article-list.component';
import { ArticleDisplayComponent } from './article-display.component';
import { ErrorDisplayComponent } from './error-display.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleDisplayComponent,
    ErrorDisplayComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class BogComponentsModule { }
