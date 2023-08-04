import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  declarations: [

  
    NotFoundComponent,
        PaginationComponent,
        LoaderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
