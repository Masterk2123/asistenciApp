import { SQLiteService } from './../services/sqlite.service';
import { DatabaseService } from 'src/app/services/database.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from "@angular/router/testing";
import { PrtbuenaPage } from './prtbuena.page';
import { StorageService } from '../services/storage.service';

describe('PrtbuenaPage', () => {
  let component: PrtbuenaPage;
  let fixture: ComponentFixture<PrtbuenaPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PrtbuenaPage ],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers:[
        //DatabaseService,
        SQLiteService,
        StorageService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PrtbuenaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
