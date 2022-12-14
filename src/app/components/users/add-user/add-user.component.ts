import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  isFormInValid = false;
  emailAlreadyExists = false;
  addUserRequest: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit(): void {}

  addUser(addForm: NgForm) {
    if (!addForm.valid) {
      this.isFormInValid = true;
      return;
    }
    this.userService.addUser(this.addUserRequest).subscribe({
      next: (user) => {
        //console.log(user);
        this.router.navigate(['users']);
      },
      error: (response) => {
        //console.log(response.status);
        if (response.status === 409) {
          this.isFormInValid = false;
          this.emailAlreadyExists = true;
        }
      },
    });
  }
}
