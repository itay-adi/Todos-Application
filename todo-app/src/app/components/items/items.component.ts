import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem } from 'src/app/core/models/todo-item.model';
import { TodoitemsService } from 'src/app/core/services/todoitems.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  activeTodoItems$!: Observable<TodoItem[]>;
  completedTodoItems$!: Observable<TodoItem[]>;

  constructor(private todoitemsService: TodoitemsService) { }

  ngOnInit(): void {
    this.activeTodoItems$ = this.todoitemsService.getActiveTodoItems();
    this.completedTodoItems$ = this.todoitemsService.getCompletedTodoItems();
  }
}
