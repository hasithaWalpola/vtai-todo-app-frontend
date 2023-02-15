import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { DataService } from 'src/app/services/data/data.service';
import { AuthService } from 'src/app/services/shared/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  loggedUser!: User;
  userList: User[] = []
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
      this.userList = res.data;
    }).catch((error) => {

    });

  }

  onView(user: User) {
    this.dataService.setSelectedUser(user)
    const data = {
      id: user.id, name: user.first_name
    }
    this.router.navigate(['user/history', data]);
  }


}
