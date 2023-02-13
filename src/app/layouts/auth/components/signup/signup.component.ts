import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  error: string = "";

  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,

  ) {
  }


  ngOnInit() {

    let path: any = this.route.snapshot.routeConfig?.path
    console.log(path, 'params');
  }


  form: FormGroup = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    conirm_password: new FormControl('', Validators.required),
  });

  submit() {
    if (this.form.valid) {

      if (this.form.value.password == this.form.value.conirm_password) {
        this.userService
          .register({
            first_name: this.form.value.first_name,
            last_name: this.form.value.last_name,
            email: this.form.value.email,
            password: this.form.value.password,
            role: this.route.snapshot.routeConfig?.path == 'signup/admin' ? 1 : 2

          })
          .then((res) => {
            console.log(res, 'Register Response');
            this.router.navigate(['/login']);
          })
          .catch((error) => {
            console.log(error, 'Error');
          });
      } else {
        console.log("Password doesn't match!");
      }

    } else {
      console.log("Invaild Form => ", this.form);
    }

  }

  goToLoginPage() {
    this.router.navigate(["login"])
  }


}
