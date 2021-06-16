import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { find, first, map } from 'rxjs/operators';
import { TodoItem } from '../models/todo-item.model';
import { TodoList } from '../models/todo-list.model';
import { TodoitemsService } from './todoitems.service';

@Injectable({
  providedIn: 'root'
})
export class TodolistsService {
  readonly baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient,
              private todoItemsService: TodoitemsService) { }

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

  getTodoListById(IdNumber: number): Observable<TodoList | undefined>{
    const url = `${this.baseUrl}/todoLists`;

    let todoListById = this.httpClient
                    .get<TodoList[]>(url)
                    .pipe(
                      map(list => list.find(l => l.id === IdNumber))
                    );                   

    return todoListById;
  }

  deleteTodoListById(IdNumber: number): Promise<TodoItem>{
    const url = `${this.baseUrl}/todoLists/${IdNumber}`;
    
    this.deleteAllTodoItemsOfAList(IdNumber);
    
    return this.httpClient
            .delete<TodoItem>(url)
            .toPromise();
  }

  private async deleteAllTodoItemsOfAList(listIdNumber: number){
    let todoItemsPerListId = await this.todoItemsService.getTodoItemsPerListId(listIdNumber).toPromise();

    todoItemsPerListId.forEach(async todoItem => {
      await this.todoItemsService.deleteTodoItemById(Number(todoItem.id));
    });
  }
}
