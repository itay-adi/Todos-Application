import { Component, OnInit } from '@angular/core';
import { TodoList } from 'src/app/core/models/todo-list.model';
import { TodolistsService } from 'src/app/core/services/todolists.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  toDoLists$!: Promise<TodoList[]>;

  constructor(private todoLists: TodolistsService) { }

  ngOnInit(): void {
    this.toDoLists$ = this.todoLists.getListsArray();
  }
}
