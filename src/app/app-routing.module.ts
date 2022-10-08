import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'users',
    component: UsersListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users/add',
    component: AddUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users/edit/:id',
    component: EditUserComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
