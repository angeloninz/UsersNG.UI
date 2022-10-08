import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { AddUserComponent } from './components/users/add-user/add-user.component';
import { FormsModule } from '@angular/forms';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [AppComponent, UsersListComponent, AddUserComponent, EditUserComponent, LoginComponent, RegisterComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
