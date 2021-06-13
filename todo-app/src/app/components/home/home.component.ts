import { Component, OnInit } from "@angular/core";
import { TodoitemsService } from "src/app/core/services/todoitems.service";
import { TodolistsService } from "src/app/core/services/todolists.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  developerName!: string;
  today!: string;

  numberOfTodoItems$!: Promise<number>;
  numberOfActiveTodoItems$!: Promise<number>;
  numberOfTodoLists$!: Promise<number>;
  
  constructor(private todoItemsService: TodoitemsService,
              private todoListsService: TodolistsService) { }

  ngOnInit(): void {
    this.developerName = "Itay Adi Yosef";
    this.today = new Date().toLocaleDateString('en-GB');

    this.numberOfTodoItems$ = this.todoItemsService.getNumberOfTodoItems();
    this.numberOfActiveTodoItems$ = this.todoItemsService.getNumberOfActiveTodoItems();
    this.numberOfTodoLists$ = this.todoListsService.getNumberOfTodoLists();
  }
}
