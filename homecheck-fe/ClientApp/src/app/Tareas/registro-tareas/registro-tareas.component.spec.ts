import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroTareasComponent } from './registro-tareas.component';

describe('RegistroTareasComponent', () => {
  let component: RegistroTareasComponent;
  let fixture: ComponentFixture<RegistroTareasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroTareasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
