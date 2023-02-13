import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { AuthService } from 'src/app/services/shared/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  loggedUser: any = {}
  userList: any = []
  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'actions'];

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private dataService: DataService

  ) { }

  ngOnInit(): void {

    this.loggedUser = this.authService.getLoggedUser()

    if (this.loggedUser) {
      this.getUsers();
    }
  }

  getUsers() {
    this.userService.getAllUsers().then((res) => {

      console.log(res, 'res');
      this.userList = res.data;

    }).catch((error) => {
      console.log(error, 'Error');
    });

  }

  onView(user: any) {
    console.log(user, 'user');
    this.dataService.setSelectedUser(user)
    this.router.navigate(['user/history', user.id]);
  }


}
