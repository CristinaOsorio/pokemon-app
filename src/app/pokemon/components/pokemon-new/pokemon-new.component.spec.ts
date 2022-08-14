import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormsModule, ReactiveFormsModule, ValidationErrors, FormGroup } from '@angular/forms';

import { PokemonNewComponent } from './pokemon-new.component';
import { CreatePokemonDTO, Pokemon } from '../../interfaces/pokemon.interface';
import { PokemonService } from '../../services/pokemon.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

const pokemonNewInformation: Pokemon = {
  attack: 40,
  defense: 30,
  hp: 0,
  id_author: 1,
  id: 1,
  image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png',
  name: 'Pikachu',
  type: '',
};

const mockedNewDataPokemon: CreatePokemonDTO = {
  attack: 84,
  defense: 78,
  hp: 20,
  idAuthor: 1,
  image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/6.png',
  name: 'Charizard',
  type: 'Fuego/Volador',
}

const mockedPokemonService: {
  createPokemon: (pokemon: CreatePokemonDTO) => Promise<Pokemon>
} = {
  createPokemon: (pokemon: CreatePokemonDTO) => new Promise(resolve => resolve(pokemonNewInformation))
};

describe('PokemonNewComponent', () => {
  let component: PokemonNewComponent;
  let fixture: ComponentFixture<PokemonNewComponent>;
  let getElement = <T>(field: string, element: string = 'input') => {
    return fixture.debugElement.query(By.css(`${element}[data-testId="${field}"]`)).nativeElement as T;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonNewComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        { provider: PokemonService, useValue: mockedPokemonService }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonNewComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a FormGroup comprised of FormControls', () => {
    component.ngOnInit();
    expect(component.form instanceof FormGroup).toBe(true);
  });

  it('should be form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should be valid name field', () => {
    let errors: ValidationErrors | null = {};
    let control: AbstractControl = component.form.controls['name'];
    let input = getElement<HTMLInputElement>('name');

    expect(control.valid).toBeFalsy();

    // Name field is required
    control.markAsTouched();
    control.setValue(null);
    errors = control.errors || {};
    expect(errors['required']).toBeTruthy();
    fixture.detectChanges();
    expect(input).toHaveClass('is-invalid');

    // Set name to something
    control.reset('');
    control.markAsTouched();
    control.setValue("test");
    errors = control.errors || {};
    expect(errors['required']).toBeFalsy();
  });

  it('should validate attack field as required', () => {
    let errors: ValidationErrors | null = {};
    let control: AbstractControl = component.form.controls['attack'];
    let input = getElement<HTMLInputElement>('attack');

    control.markAsTouched();
    control.setValue(null);
    errors = control.errors || {};
    expect(errors['required']).toBeTruthy();

    fixture.detectChanges();
    expect(input).toHaveClass('is-invalid');
  });

  it('should validate attack field as integer and positive number', () => {
    let errors: ValidationErrors | null = {};
    let control: AbstractControl = component.form.controls['attack'];
    let input = getElement<HTMLInputElement>('attack');

    control.markAsTouched();
    control.setValue('Mundo');
    errors = control.errors || {};
    fixture.detectChanges();
    expect(errors['pattern']).toBeTruthy();
    expect(input).toHaveClass('is-invalid');

    control.reset('');
    control.markAsTouched();
    control.setValue(-100);
    fixture.detectChanges();
    errors = control.errors || {};
    expect(errors['pattern']).toBeTruthy();
    expect(input).toHaveClass('is-invalid');
  });

  it('should validate attack field as max 100', () => {
    let errors: ValidationErrors | null = {};
    let control: AbstractControl = component.form.controls['attack'];
    let input = getElement<HTMLInputElement>('attack');

    control.markAsTouched();
    control.setValue(200);
    fixture.detectChanges();
    errors = control.errors || {};
    expect(errors['max']).toBeTruthy();
    expect(input).toHaveClass('is-invalid');
  });

  it('should be valid attack field', () => {
    let attack: AbstractControl = component.form.controls['attack'];

    attack.setValue(100);
    expect(attack.valid).toBeTruthy();
  });

  it('should validate defense field as required', () => {
    let errors: ValidationErrors | null = {};
    let control: AbstractControl = component.form.controls['defense'];
    let input = getElement<HTMLInputElement>('defense');

    control.markAsTouched();
    control.setValue(null);
    fixture.detectChanges();
    errors = control.errors || {};
    expect(errors['required']).toBeTruthy();
    expect(input).toHaveClass('is-invalid');
  });

  it('should validate defense field as integer and positive number', () => {
    let errors: ValidationErrors | null = {};
    let control: AbstractControl = component.form.controls['defense'];
    let input = getElement<HTMLInputElement>('defense');

    control.markAsTouched();
    control.setValue('Mundo');
    fixture.detectChanges();
    errors = control.errors || {};
    expect(errors['pattern']).toBeTruthy();
    expect(input).toHaveClass('is-invalid');

    control.reset(0);
    control.markAsTouched();
    control.setValue(-100);
    fixture.detectChanges();
    errors = control.errors || {};
    expect(errors['pattern']).toBeTruthy();
    expect(input).toHaveClass('is-invalid');
  });

  it('should validate defense field as max 100', () => {
    let errors: ValidationErrors | null = {};
    let control: AbstractControl = component.form.controls['defense'];
    let input = getElement<HTMLInputElement>('defense');

    control.markAsTouched();
    control.setValue(200);
    errors = control.errors || {};
    expect(errors['max']).toBeTruthy();
    fixture.autoDetectChanges();
    expect(input).toHaveClass('is-invalid');
  });

  it('should be valid defense field', () => {
    let control: AbstractControl = component.form.controls['defense'];

    control.setValue(100);
    expect(control.valid).toBeTruthy();
  });

  it('should be valid image field', () => {
    let image: AbstractControl = component.form.controls['image'];

    image.setValue('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png');
    expect(image.valid).toBeTruthy();
  });

  it('should validate image field as pattern', () => {
    let errors: ValidationErrors | null = {};
    let control: AbstractControl = component.form.controls['image'];
    let input = getElement<HTMLInputElement>('image');

    control.markAsTouched();
    control.setValue('Mundo');
    errors = control.errors || {};
    expect(errors['pattern']).toBeTruthy();
    fixture.autoDetectChanges();
    expect(input).toHaveClass('is-invalid');

    control.markAsTouched();
    control.setValue(1);
    errors = control.errors || {};
    expect(errors['pattern']).toBeTruthy();
    fixture.autoDetectChanges();
    expect(input).toHaveClass('is-invalid');

    control.markAsTouched();
    control.setValue('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back');
    errors = control.errors || {};
    expect(errors['pattern']).toBeTruthy();
    fixture.autoDetectChanges();
    expect(input).toHaveClass('is-invalid');
  });

  it('#clean() should clean form in click "Cancelar" button', () => {
    const button = getElement<HTMLButtonElement>('cancel', 'button');

    const mocketNew: CreatePokemonDTO = {
      attack: 84,
      defense: 78,
      hp: 20,
      idAuthor: 1,
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/6.png',
      name: 'Charizard',
      type: 'Fuego/Volador',
    };

    const mockedCancelPokemon: CreatePokemonDTO = {
      attack: 0,
      defense: 0,
      hp: 0,
      idAuthor: 1,
      image: '',
      name: '',
      type: '',
    };

    component.form.markAllAsTouched();
    component.form.setValue(mocketNew);

    button.click();
    component.cancel();

    const valuesForm = component.form.getRawValue();
    expect(valuesForm).toEqual(mockedCancelPokemon);
  });

  it('#save() should mark form invalid in click "Guardar" button', () => {
    const button = getElement<HTMLButtonElement>('cancel', 'button');

    expect(component.form.valid).toBeFalsy();

    const mocketNew: CreatePokemonDTO = { ...mockedNewDataPokemon };
    mocketNew.defense = -30;

    component.form.setValue(mocketNew);
    component.form.markAllAsTouched();
    button.click();
    expect(component.save()).toBe(undefined);
    expect(component.form.invalid).toBeTrue();

  });

});
