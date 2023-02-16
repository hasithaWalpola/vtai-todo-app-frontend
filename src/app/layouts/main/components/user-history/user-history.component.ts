/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationHistory } from 'src/app/models/history.model';
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
    private translationService: TranslationService,
    public route: Router,
  ) { }

  ngOnInit() {

    const params: object = this.router.snapshot.params
    console.log(params, 'params');
    this.selectedUser = params;
    if (this.selectedUser) {
      this.getHistory();
    }


  }


  getHistory() {
    this.translationService.getTranslationsByUser(this.selectedUser.id)
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
