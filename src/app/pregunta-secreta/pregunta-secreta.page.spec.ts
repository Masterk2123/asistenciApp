import { SQLiteService } from './../services/sqlite.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from "@angular/router/testing";
import { PreguntaSecretaPage } from './pregunta-secreta.page';

describe('PreguntaSecretaPage', () => {
  let component: PreguntaSecretaPage;
  let fixture: ComponentFixture<PreguntaSecretaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PreguntaSecretaPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        DatabaseService,
        SQLiteService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PreguntaSecretaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
