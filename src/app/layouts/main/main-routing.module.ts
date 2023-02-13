import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/helpers/auth-guard';

import { TodoComponent } from './components/todo/todo.component';
import { UserHistoryComponent } from './components/user-history/user-history.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: 'home', component: TodoComponent, canActivate: [AuthGuard] },

  { path: 'users', component: UserComponent, canActivate: [AuthGuard] },

  { path: 'user/history', component: UserHistoryComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
