import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserToken } from 'src/app/models/token.model';
import { AuthService } from 'src/app/services/shared/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  error = "";

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,

  ) { }

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(
      '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
    ),]),
    password: new FormControl('', [Validators.required])
  });

  submit() {

    //Check if the form is valid one
    if (this.form.valid) {
      this.userService
        .login({
          email: this.form.value.email,
          password: this.form.value.password,
        })
        .then((res) => {
          const userToken: UserToken = { token: res.token };

          //Store user token in storage
          this.authService.storeUserToken(userToken);

          //Get logged in user data
          this.userService.getLoggedUser().then((res) => {
            this.authService.storeLoggedUser(res.data);

            //Check user role and navigate acordingly
            if (res.data.role == 1) {
              this.router.navigate(['/users']);
            } else {
              this.router.navigate(['/home']);
            }

          })

        })
        .catch((error) => {
          this.error = error.error
        });


    }
  }

  goToSignupPage() {
    this.router.navigate(["signup"])
  }

}
