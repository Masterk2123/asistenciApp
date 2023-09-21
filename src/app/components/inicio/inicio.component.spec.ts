import { SQLiteService } from './../../services/sqlite.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from "@angular/router/testing";
import { InicioComponent } from './inicio.component';
import { AuthenticationService } from 'src/app/services/authetication.service';
import { StorageService } from 'src/app/services/storage.service';

describe('InicioComponent', () => {
  let component: InicioComponent;
  let fixture: ComponentFixture<InicioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InicioComponent ],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        AuthenticationService,
        //DatabaseService,
        StorageService,
        SQLiteService,

      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
