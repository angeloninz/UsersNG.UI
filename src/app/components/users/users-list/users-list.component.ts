import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  users: User[] = [
    /*{
      id: 1,
      firstName: 'Tony',
      lastName: 'Stark',
      email: 'tony.stark@gmail.com',
      password: '1234',
    },
    {
      id: 2,
      firstName: 'Peter',
      lastName: 'Parker',
      email: 'peter.parker@gmail.com',
      password: '1234',
    },
    {
      id: 3,
      firstName: 'Bruce',
      lastName: 'Wayne',
      email: 'bwayne@gmail.com',
      password: '1234',
    },*/
  ];

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (user) => {
        //console.log(user);
        this.users = user.data;
      },
      error: (response) => {
        console.log(response);
      },
    });
  }
}
