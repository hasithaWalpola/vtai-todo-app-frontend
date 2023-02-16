import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { MaterialModule } from 'src/app/material.module';
import { TopNavComponent } from './components/shared/top-nav/top-nav.component';
import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule
      ],
      declarations: [MainComponent, TopNavComponent],
      providers: [JwtHelperService, { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
