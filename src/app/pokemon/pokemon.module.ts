import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonComponent } from './pokemon/pokemon.component';
import { ComponentsModule } from './components/components.module';



@NgModule({
  declarations: [
    PokemonComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports: [
    PokemonComponent
  ]
})
export class PokemonModule { }
