import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data/data.service';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss']
})
export class UserHistoryComponent {

  userHistory: any = []
  selectedUser: any = {}

  constructor(
    private router: ActivatedRoute,
    private dataService: DataService,
    private translationService: TranslationService,
    private route: Router,
  ) { }

  ngOnInit() {

    let params: any = this.router.snapshot.params
    console.log(params, 'params');
    this.selectedUser = params;
    if (this.selectedUser) {
      this.getHistory();
    }


  }


  getHistory() {
    this.translationService.getTranslationsByUser(this.selectedUser.user).then((res) => {

      console.log(res, 'res');
      this.userHistory = res.data;

    }).catch((error) => {
      console.log(error, 'Error');
    });

  }

  backButton() {
    this.route.navigate(["users"])
  }
}
