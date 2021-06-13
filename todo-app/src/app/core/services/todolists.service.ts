import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { TodoList } from '../models/todo-list.model';

@Injectable({
  providedIn: 'root'
})
export class TodolistsService {
  readonly baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  getNumberOfTodoLists(): Promise<number>{
    const url = `${this.baseUrl}/todoLists`;

    let numberOfTodoLists = this.httpClient
                        .get<TodoList[]>(url)
                        .pipe(map(list => list.length))
                        .toPromise();

    return numberOfTodoLists;
  }

  getListsArray(): Promise<TodoList[]>{
    const url = `${this.baseUrl}/todoLists`;

    let todoLists = this.httpClient
                .get<TodoList[]>(url)
                .toPromise();

    return todoLists;
  }
}
