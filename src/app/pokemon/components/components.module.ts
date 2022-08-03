import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonNewComponent } from './pokemon-new/pokemon-new.component';



@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonNewComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PokemonListComponent,
    PokemonNewComponent,
  ]
})
export class ComponentsModule { }
