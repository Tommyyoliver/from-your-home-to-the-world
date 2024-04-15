import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../service/client.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {

  private router = inject(Router);
  private clientService = inject(ClientService);

  private dataUserLogued = localStorage.getItem('user') ?? "";

  control: FormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(100)
  ])

  getTimeNow() {
    let seconds = `${new Date().getSeconds()}`;
    let minutes = `${new Date().getMinutes()}`;
    let hours = `${new Date().getHours()}`;
    let day = `${new Date().getDate()}`;
    let month = `${new Date().getMonth() + 1}`;
    if (Number(day) < 10) day = "0".concat(day);
    if (Number(month) < 10) month = "0".concat(month);
    if (Number(minutes) < 10) minutes = "0".concat(minutes);
    if (Number(hours) < 10) hours = "0".concat(hours);
    if (Number(seconds) < 10) seconds = "0".concat(seconds);
    return `${month}/${day} - ${hours}:${minutes}:${seconds}`
  }

  pub() {
    if (this.control.valid && this.control.touched) { // validators form
      this.clientService.addNewMessage(this.control.value, this.getTimeNow(), JSON.parse(this.dataUserLogued).id);
      this.control.reset(); // format control from form
      this.navigateTo('');
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

}
