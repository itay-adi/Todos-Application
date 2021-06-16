import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodoItem } from '../models/todo-item.model';

import { map } from 'rxjs/operators'
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoList } from '../models/todo-list.model';

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

  addItemToTodoList(todoItem: TodoItem): Promise<TodoItem>{
    const url = `${this.baseUrl}/todoItems`;

    return this.httpClient
            .post<TodoItem>(url, todoItem)
            .toPromise();
  }

  deleteTodoItemById(IdNumber: number): Promise<TodoList>{
    const url = `${this.baseUrl}/todoItems/${IdNumber}`;

    return this.httpClient
            .delete<TodoList>(url)
            .toPromise();
  }

  async markTodoItemAs(IdNumber: number): Promise<TodoItem>{
    const url = `${this.baseUrl}/todoItems/${IdNumber}`;

    let completeStatus = await this.getTodoItemStatus(IdNumber);

    return this.httpClient
            .patch<TodoItem>(url, {"isCompleted": !completeStatus})
            .toPromise();
  }

  private getTodoItemStatus(IdNumber: number): Promise<boolean>{
    const url = `${this.baseUrl}/todoItems/${IdNumber}`;

    return this.httpClient
              .get<TodoItem>(url)
              .pipe(
                map(td => td.isCompleted)
              )
              .toPromise();
  }
}