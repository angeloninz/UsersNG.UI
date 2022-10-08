import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  userDetails: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {
          this.userService.getUser(id).subscribe({
            next: (user) => {
              //console.log(user);
              this.userDetails = user.data;
            },
          });
        }
      },
    });
  }

  updateUser() {
    this.userService
      .updateUser(this.userDetails?.id || 0, this.userDetails)
      .subscribe({
        next: (user) => {
          this.router.navigate(['users']);
        },
      });
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe({
      next: (user) => {
        this.router.navigate(['users']);
      },
    });
  }
}
