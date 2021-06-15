import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoItem } from '../models/todo-item.model';

import { filter, map } from 'rxjs/operators'
import { BehaviorSubject, Observable } from 'rxjs';

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

  getNumberOfTodoItemsPerList(listId :number): Promise<number>{
    const url = `${this.baseUrl}/todoItems`;

    let numberOfTodoItemsPerList = this.httpClient
                            .get<TodoItem[]>(url)
                            .pipe(
                              map(list => list.filter(td => td.listId === listId).length))
                            .toPromise();

    return numberOfTodoItemsPerList;
  }

  getTodoItemsPerListId(listId :number): Observable<TodoItem[]>{
    const url = `${this.baseUrl}/todoItems`;

    let todoItemsPerList = this.httpClient
                            .get<TodoItem[]>(url)
                            .pipe(
                              map(list => list.filter(td => td.listId === listId)));

    return todoItemsPerList;
  }

  getActiveTodoItems(): Observable<TodoItem[]>{
    const url = `${this.baseUrl}/todoItems`;

    let allTodoItems = this.httpClient
                        .get<TodoItem[]>(url)
                        .pipe(
                          map(list => list.filter(td => td.isCompleted === false))
                        );

    return allTodoItems;
  }

  getCompletedTodoItems(): Observable<TodoItem[]>{
    const url = `${this.baseUrl}/todoItems`;

    let allTodoItems = this.httpClient
                        .get<TodoItem[]>(url)
                        .pipe(
                          map(list => list.filter(td => td.isCompleted === true))
                        );

    return allTodoItems;
  }

  addItemToTodoList(todoItem: TodoItem){
    const url = `${this.baseUrl}/todoItems`;

    return this.httpClient
            .post(url, todoItem)
            .toPromise();
  }

  deleteTodoItemById(IdNumber: number){
    const url = `${this.baseUrl}/todoItems/${IdNumber}`;

    return this.httpClient
            .delete(url)
            .toPromise();
  }
}