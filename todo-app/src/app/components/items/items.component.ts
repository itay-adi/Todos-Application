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

  constructor(private todoItemsService: TodoitemsService) { }

  ngOnInit(): void {
    this.activeTodoItems$ = this.todoItemsService.getActiveTodoItems();
    this.completedTodoItems$ = this.todoItemsService.getCompletedTodoItems();
  }

  async markItem(currentItemId : number | undefined, isComplete: boolean){
    await this.todoItemsService.markTodoItemAs(Number(currentItemId));
  }
}
