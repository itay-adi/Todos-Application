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
  readonly baseUrl = 'http://localhost:5000/TodoGroups';

  constructor(private httpClient: HttpClient,
              private todoItemsService: TodoitemsService) { }

  getNumberOfTodoLists(): Promise<number>{
    const url = `${this.baseUrl}/countAll`;

    let numberOfTodoLists = this.httpClient
                        .get<number>(url)
                        /*.pipe(
                          map(list => list.length))*/
                        .toPromise();

    return numberOfTodoLists;
  }

  getListsArray(): Promise<TodoList[]>{
    const url = `${this.baseUrl}`;

      let todoLists = this.httpClient
                .get<TodoList[]>(url)
                .toPromise();

    return todoLists;
  }

  getTodoListById(IdNumber: number): Observable<TodoList | undefined>{
    const url = `${this.baseUrl}/${IdNumber}`;

    let todoListById = this.httpClient
                    .get<TodoList>(url);                                   

    return todoListById;
  }

  async deleteTodoListById(IdNumber: number): Promise<TodoItem>{
    const url = `${this.baseUrl}/${IdNumber}`;
    
    //await this.deleteAllTodoItemsOfAList(IdNumber);
    
    return this.httpClient
            .delete<TodoItem>(url)
            .toPromise();
  }

  /*private async deleteAllTodoItemsOfAList(listIdNumber: number){
    let todoItemsPerListId = await this.todoItemsService.getTodoItemsPerListId(listIdNumber).toPromise();

    todoItemsPerListId.forEach(async todoItem => {
      await this.todoItemsService.deleteTodoItemById(Number(todoItem.id));
    });
  }*/

  setListByID(todoList: TodoList): Promise<TodoList>{
    const url = `${this.baseUrl}/${todoList.id}`;

    return this.httpClient
            .put<TodoList>(url, todoList)
            .toPromise();
  }

  addNewTodoList(todoList: TodoList): Promise<TodoList>{
    const url = `${this.baseUrl}`;

    let newTodoList = this.httpClient
                            .post<TodoList>(url, todoList)
                            .toPromise();
                            
    return newTodoList; 
  }
}
