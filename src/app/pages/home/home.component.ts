import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from '../../service/client.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  private router = inject(Router);
  private clientService = inject(ClientService);

  messageslist: Array<any> = [];

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logoutUser() {
    localStorage.setItem('user', JSON.stringify({}));
    this.navigateTo('login');
  }

  ngOnInit(): void {
    this.clientService.getAllMessage().then(messages => {
      this.messageslist = messages.rows
    });
  }

}
