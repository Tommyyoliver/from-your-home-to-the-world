import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ClientService } from '../service/client.service';

export const authGuard: CanActivateFn = async (route, state) => {

  const clientService = inject(ClientService);

  const router = inject(Router);
  let usersList: any;
  let userLogued;
  if (localStorage.getItem('user')) {
    userLogued = JSON.parse(localStorage.getItem('user') ?? "");
  } else {
    userLogued = ""
  }

  await clientService.getAllUsers().then(users => {
    usersList = users.rows ?? [];
  })
  if (userLogued.id) {
    for (const user of usersList) {
      if (user.user_name == userLogued.name && user.user_id == userLogued.id) {
        return true
      }
    }
  }
  const url = router.createUrlTree(['login']);
  return url
};
