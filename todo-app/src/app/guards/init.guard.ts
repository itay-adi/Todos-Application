import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TodolistsService } from '../core/services/todolists.service';

@Injectable({
  providedIn: 'root'
})
export class InitGuard implements CanActivate {

  constructor(private todoListsService: TodolistsService,
              private router: Router){}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Promise<boolean | UrlTree> {

    let numOfLists = await this.todoListsService.getNumberOfTodoLists();

    if(numOfLists > 0) return true;

    return this.router.parseUrl('lists/-1/edit');
  }
}
