import { SQLiteService } from './../services/sqlite.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearUsuariosPage } from './crear-usuarios.page';

describe('CrearUsuariosPage', () => {
  let component: CrearUsuariosPage;
  let fixture: ComponentFixture<CrearUsuariosPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearUsuariosPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        DatabaseService,
        SQLiteService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearUsuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
