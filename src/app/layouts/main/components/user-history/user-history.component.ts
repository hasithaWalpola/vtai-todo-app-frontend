import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationHistory } from 'src/app/models/history.model';
import { DataService } from 'src/app/services/data/data.service';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.scss']
})
export class UserHistoryComponent implements OnInit {

  userHistory: TranslationHistory[] = []
  selectedUser!: any;

  constructor(
    private router: ActivatedRoute,
    private dataService: DataService,
    private translationService: TranslationService,
    private route: Router,
  ) { }

  ngOnInit() {

    const params: any = this.router.snapshot.params
    console.log(params, 'params');
    this.selectedUser = params;
    if (this.selectedUser) {
      this.getHistory();
    }


  }


  getHistory() {
    this.translationService.getTranslationsByUser(this.selectedUser.user)
      .subscribe({
        next: (res) => {
          this.userHistory = res.data;
        },
        error: (e) => console.error(e)
      });

  }

  backButton() {
    this.route.navigate(["users"])
  }
}
