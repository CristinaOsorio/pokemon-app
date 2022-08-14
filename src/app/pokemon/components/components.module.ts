import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonNewComponent } from './pokemon-new/pokemon-new.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonNewComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PokemonListComponent,
    PokemonNewComponent,
  ]
})
export class ComponentsModule { }
