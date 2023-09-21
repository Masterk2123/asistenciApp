import { SQLiteService } from './../services/sqlite.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { AuthenticationService } from '../services/authetication.service';
import { StorageService } from '../services/storage.service';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule],
      providers: [
        DatabaseService,
        // SQLiteService,
        // AuthenticationService,
        // StorageService 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
