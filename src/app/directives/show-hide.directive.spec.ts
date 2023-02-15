import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ShowHideDirective } from './show-hide.directive';
import { AuthService } from '../services/shared/auth.service';

@Component({
  template: `
    <div appShowHide></div>
  `
})
class TestComponent { }

describe('ShowHideDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowHideDirective, TestComponent],
      providers: [AuthService],
    });

    fixture = TestBed.createComponent(TestComponent);
    authService = TestBed.inject(AuthService);
  });

  it('should hide the element if user role is 1', () => {
    spyOn(authService, 'getLoggedUser').and.returnValue({
      role: 1,
      id: 0,
      first_name: '',
      last_name: '',
      email: ''
    });

    fixture.detectChanges();

    const div: DebugElement = fixture.debugElement.query(By.directive(ShowHideDirective));
    expect(div.nativeElement.style.display).toBe('none');
  });

  it('should show the element if user role is not 1', () => {
    spyOn(authService, 'getLoggedUser').and.returnValue({
      role: 2,
      id: 0,
      first_name: '',
      last_name: '',
      email: ''
    });

    fixture.detectChanges();

    const div: DebugElement = fixture.debugElement.query(By.directive(ShowHideDirective));
    expect(div.nativeElement.style.display).toBe('contents');
  });
});
