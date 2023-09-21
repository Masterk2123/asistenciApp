import { RouteReuseStrategy } from '@angular/router';
import { SQLiteService } from './../services/sqlite.service';
import { AuthenticationService } from 'src/app/services/authetication.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [IonicModule.forRoot()],
      providers: [
        DatabaseService, 
        AuthenticationService,
        SQLiteService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
