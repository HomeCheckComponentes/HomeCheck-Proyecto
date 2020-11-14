import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarFamiliaComponent } from './registrar-familia.component';

describe('RegistrarFamiliaComponent', () => {
  let component: RegistrarFamiliaComponent;
  let fixture: ComponentFixture<RegistrarFamiliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrarFamiliaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarFamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
