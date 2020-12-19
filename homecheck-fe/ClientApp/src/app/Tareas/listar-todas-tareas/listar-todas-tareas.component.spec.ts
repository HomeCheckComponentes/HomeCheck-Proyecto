import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTodasTareasComponent } from './listar-todas-tareas.component';

describe('ListarTodasTareasComponent', () => {
  let component: ListarTodasTareasComponent;
  let fixture: ComponentFixture<ListarTodasTareasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarTodasTareasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTodasTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
