import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarUsuariosfamiliaComponent } from './listar-usuariosfamilia.component';

describe('ListarUsuariosfamiliaComponent', () => {
  let component: ListarUsuariosfamiliaComponent;
  let fixture: ComponentFixture<ListarUsuariosfamiliaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarUsuariosfamiliaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarUsuariosfamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
