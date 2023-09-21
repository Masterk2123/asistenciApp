import { SQLiteService } from './../../services/sqlite.service';
import { DatabaseService } from 'src/app/services/database.service';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authetication.service';
import { ComentariosPostsComponent } from './comentarios-posts.component';
import { StorageService } from 'src/app/services/storage.service';

describe('ComentariosPostsComponent', () => {
  let component: ComentariosPostsComponent;
  let fixture: ComponentFixture<ComentariosPostsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ComentariosPostsComponent ],
      imports: [IonicModule.forRoot(), HttpClientModule],
      providers: [
        AuthenticationService,
        DatabaseService,
        StorageService,
        SQLiteService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ComentariosPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
