import { Component, OnInit } from "@angular/core";
import { TodoitemsService } from "src/app/core/services/todoitems.service";

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

  lists = 2;
  
  constructor(private todoItemsService: TodoitemsService) { }

  ngOnInit(): void {
    this.developerName = "Itay Adi Yosef";
    this.today = new Date().toLocaleDateString('en-GB');

    this.numberOfTodoItems$ = this.todoItemsService.getNumberOfTodoItems();
    this.numberOfActiveTodoItems$ = this.todoItemsService.getNumberOfActiveTodoItems();
  }
}
