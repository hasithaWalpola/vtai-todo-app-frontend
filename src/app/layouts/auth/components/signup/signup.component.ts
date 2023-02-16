import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  error = "";
  passwordMatch = false;

  constructor(
    public router: Router,
    private userService: UserService,
    private route: ActivatedRoute,

  ) {
  }


  form: FormGroup = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(
      '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
    ),]),
    password: new FormControl('', [Validators.required, Validators.pattern(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$'
    )]),
    conirm_password: new FormControl('', Validators.required),
  });

  submit() {

    //Check if the form is valid one
    if (this.form.valid) {

      //Check if both password and confirm password match
      if (this.form.value.password == this.form.value.conirm_password) {
        this.passwordMatch = true;
        const user = new User();
        user.first_name = this.form.value.first_name,
          user.last_name = this.form.value.last_name,
          user.email = this.form.value.email,
          user.password = this.form.value.password,
          user.role = this.route.snapshot.routeConfig?.path == 'signup/admin' ? 1 : 2
        this.userService
          .register(user)
          .subscribe({
            next: () => {
              this.router.navigate(['/login']);
            },
            error: (error) => this.error = error.error
          });

      } else {
        this.passwordMatch = false;
      }

    }

  }

  goToLoginPage() {
    this.router.navigate(["login"])
  }


}
