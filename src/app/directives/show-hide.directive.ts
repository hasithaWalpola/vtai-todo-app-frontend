import { Directive, ElementRef, Input } from '@angular/core';
import { AuthService } from '../services/shared/auth.service';

@Directive({
  selector: '[appShowHide]'
})
export class ShowHideDirective {

  constructor(
    private elRef: ElementRef,
    private authService: AuthService,
  ) { }

  @Input() role: any;

  loggedUserRole: any;
  userRole: any;

  ngAfterViewInit(): void {

    this.showHide()
  }


  showHide() {
    let userRole = this.authService.getLoggedUser().role
    console.log(userRole, 'userRole');

    if (userRole != 1) {
      this.elRef.nativeElement.style.display = 'contents';
    } else {
      this.elRef.nativeElement.style.display = 'none';
    }


  }

}
