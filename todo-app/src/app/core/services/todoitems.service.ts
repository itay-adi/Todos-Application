import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoItem } from '../models/todo-item.model';

import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TodoitemsService {
  readonly baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  getNumberOfTodoItems(): Promise<number>{
    const url = `${this.baseUrl}/todoItems`;

    let numberOfTodoItems = this.httpClient
                            .get<TodoItem[]>(url)
                            .pipe(map(list => list.length))
                            .toPromise();

    return numberOfTodoItems;
  }

  getNumberOfActiveTodoItems(): Promise<number>{
    const url = `${this.baseUrl}/todoItems`;

    let numberOfActiveTodoItems = this.httpClient
                            .get<TodoItem[]>(url)
                            .pipe(
                              map(list => list.filter(td => td.isCompleted === false)),
                              map(td => td.length))
                            .toPromise();

    return numberOfActiveTodoItems;
  }
}
