import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './article-list.component';
import { ArticleDisplayComponent } from './article-display.component';
import { ErrorDisplayComponent } from './error-display.component';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleDisplayComponent,
    ErrorDisplayComponent,
    MenuComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports:[
    MenuComponent
  ]
})
export class BogComponentsModule { }
