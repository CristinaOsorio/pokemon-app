import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PokemonService } from '../../services/pokemon.service';
import { Pokemon, CreatePokemonDTO } from '../../interfaces/pokemon.interface';
import { markAsTouchedForm } from 'src/app/helpers/markAsTouchedForm.helper';

const intRegExp = /^([+]?[1-9]\d*|0)$/;
const urlRegExp = /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/;

@Component({
  selector: 'app-pokemon-new',
  templateUrl: './pokemon-new.component.html',
  styleUrls: ['./pokemon-new.component.css']
})

export class PokemonNewComponent implements OnInit {

  form!: FormGroup;
  errorMsg: { [key: string]: string } = {
    defense_missing: 'Ha ocurrido un problema con el campo defensa.',
    idAuthor_missing: 'Ha ocurrido un problema con el campo autor.',
    attack_missing: 'Ha ocurrido un problema con el campo ataque.',
    hp_missing: 'Ha ocurrido un problema con el campo hp.',
    image_missing: 'Ha ocurrido un problema con el campo imagen.',
    name_missing: 'Ha ocurrido un problema con el campo name.',
    type_missing: 'Ha ocurrido un problema con el campo tipo.',
  }

  constructor(private fb: FormBuilder, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      attack: [0, [
        Validators.required,
        Validators.pattern(intRegExp),
        Validators.max(100),
      ]],
      image: ['', [
        Validators.required,
        Validators.pattern(urlRegExp)
      ]],
      defense: [0, [
        Validators.required,
        Validators.pattern(intRegExp),
        Validators.max(100),
      ]],
      hp: [
        { value: 0, disabled: true }
      ],
      type: [{ value: '', disabled: true }],
      idAuthor: [
        { value: 1, disabled: true }
      ],
    });
  }

  getControl(field: keyof Pokemon) {
    return this.form.controls[field];
  }

  hasErrorAndIsTocuhed(field: keyof Pokemon, error: string): boolean {
    const control = this.getControl(field);
    return control.hasError(error) && control.touched;
  }

  hasInvalidAndTouched(field: keyof Pokemon): boolean {
    const control = this.getControl(field);
    return control.invalid && control.touched;
  }

  save() {
    /* istanbul ignore else */
    if (this.form.invalid) return markAsTouchedForm(this.form);

  }

  cancel() {
    this.form.reset({
      attack: 0,
      defense: 0,
      hp: 0,
      idAuthor: 1,
      image: '',
      name: '',
      type: '',
    });
  }

}
