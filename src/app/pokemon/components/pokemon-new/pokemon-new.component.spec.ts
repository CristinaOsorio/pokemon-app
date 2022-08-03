import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonNewComponent } from './pokemon-new.component';

describe('PokemonNewComponent', () => {
  let component: PokemonNewComponent;
  let fixture: ComponentFixture<PokemonNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
