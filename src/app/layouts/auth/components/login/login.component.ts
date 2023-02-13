import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/shared/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  returnUrl: string = '';
  error: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,

  ) {

  }

  ngOnInit(): void {

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

    console.log(this.returnUrl);
  }

  form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  submit() {
    console.log(this.form.value, 'this.form.value');

    if (this.form.valid) {
      this.userService
        .login({
          email: this.form.value.email,
          password: this.form.value.password,
        })
        .then((res) => {
          //console.log(res, 'Login Response', this.returnUrl);
          const userToken: any = { token: res.token };
          this.authService.storeUserToken(userToken);
          this.userService.getLoggedUser().then((res) => {

            this.authService.storeLoggedUser(res.data);
            //this.router.navigate([this.returnUrl]);
            if (res.data.role == 1) {
              this.router.navigate(['/users']);
            } else {
              this.router.navigate(['/home']);
            }

          })

        })
        .catch((error) => {
          console.log(error, 'Error');
        });


    } else {
      console.log("Form not filled");

    }
  }

  goToSignupPage() {
    this.router.navigate(["signup"])
  }

}
