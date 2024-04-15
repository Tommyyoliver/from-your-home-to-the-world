import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../service/client.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  private route = inject(Router);
  private clientService = inject(ClientService);

  username: string = "";
  password: string = "";
  private usersList: any[] = [];
  existUserName: boolean = false;
  dataUserLogued = {};

  // control forms ---------------

  controlUserName: FormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(15),
  ]);
  controlUserPassword: FormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(30),
  ])

  verifyControl(): boolean {
    if (!this.controlUserName.valid && this.controlUserName.touched) {
      return false
    } else if (!this.controlUserPassword.valid && this.controlUserPassword.touched) {
      return false
    } else if (!this.controlUserName.valid || !this.controlUserPassword.valid) {
      return false
    } else {
      return true
    }
  }

  // functions user ---------------

  async registerUser() {
    if (this.verifyControl()) {
      await this.clientService.getAllUsers().then(users => {
        this.usersList = users.rows;
      });
      this.existUserName = false;
      for (const user of this.usersList) {
        if (user.user_name == this.username) {
          alert("User exist, try other name");
          this.existUserName = true;
          break
        }
      }
      if (!this.existUserName) {
        await this.clientService.addNewUser(this.username, this.password);
        await this.clientService.getUser(this.username).then(user => {
          this.dataUserLogued = {
            id: user.rows[0]['user_id'],
            name: user.rows[0]['user_name']
          }
        })
        localStorage.setItem('user', JSON.stringify(this.dataUserLogued));
        this.route.navigate(['']);
      }
      this.username = "";
      this.password = "";
    }
  }

  async loginUser() {
    if (this.verifyControl()) {
      await this.clientService.getAllUsers().then(users => {
        this.usersList = users.rows;
      });
      for (const user of this.usersList) {
        if (user.user_name == this.username && user.user_password == this.password) {
          await this.clientService.getUser(this.username).then(user => {
            this.dataUserLogued = {
              id: user.rows[0]['user_id'],
              name: user.rows[0]['user_name']
            }
          })
          localStorage.setItem('user', JSON.stringify(this.dataUserLogued));
          this.route.navigate(['']);
          this.existUserName = true;
          break;
        }
      }
      if (!this.existUserName) alert("Name or password incorrect");
    }
  }

  ngOnInit(): void {
    localStorage.removeItem('user');
  }

}
