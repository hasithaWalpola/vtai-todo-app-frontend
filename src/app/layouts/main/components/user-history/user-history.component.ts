import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private dataService: DataService,
    private translationService: TranslationService
  ) { }

  ngOnInit() {

    console.log(this.dataService.selectedUser, 'params');
    this.selectedUser = this.dataService.selectedUser;
    this.getHistory();

  }


  getHistory() {
    this.translationService.getTranslationsByUser(this.selectedUser.id).then((res) => {

      console.log(res, 'res');
      this.userHistory = res.data;

    }).catch((error) => {
      console.log(error, 'Error');
    });

  }
}
