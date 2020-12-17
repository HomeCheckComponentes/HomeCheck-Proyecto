import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilFamiliaComponent } from './perfil-familia.component';

describe('PerfilFamiliaComponent', () => {
  let component: PerfilFamiliaComponent;
  let fixture: ComponentFixture<PerfilFamiliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilFamiliaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilFamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
