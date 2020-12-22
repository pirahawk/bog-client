import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './article-list.component';
import { ArticleDisplayComponent } from './article-display.component';
import { ErrorDisplayComponent } from './error-display.component';

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleDisplayComponent,
    ErrorDisplayComponent],
  imports: [
    CommonModule
  ]
})
export class BogComponentsModule { }
