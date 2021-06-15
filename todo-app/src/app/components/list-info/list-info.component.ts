import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoItem } from 'src/app/core/models/todo-item.model';
import { TodoList } from 'src/app/core/models/todo-list.model';
import { TodoitemsService } from 'src/app/core/services/todoitems.service';
import { TodolistsService } from 'src/app/core/services/todolists.service';

@Component({
  selector: 'app-list-info',
  templateUrl: './list-info.component.html',
  styleUrls: ['./list-info.component.css']
})
export class ListInfoComponent implements OnInit {
  list$!: Observable<TodoList | undefined>;
  items$!: Observable<TodoItem[]>;

  delete: boolean = false;
  toDelete$ = new BehaviorSubject<boolean>(this.delete);

  newItem!: FormGroup;
  
  constructor(private todolistsService: TodolistsService,
              private todoItemService: TodoitemsService,
              private route: ActivatedRoute, //ActivatedRoute helps to get data from the URL
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    let currentListId = this.getCurrentListId();

    this.list$ = this.todolistsService.getTodoListById(currentListId);
    this.items$ = this.todoItemService.getTodoItemsPerListId(currentListId);

    this.newItem = this.formBuilder.group({
                                  caption: ["",[Validators.required]]}
                                  );
  }

  private getCurrentListId(): number{
    return Number(this.route.snapshot.params['id']);
  }

  showDelete(){
    this.delete = !this.delete;
    this.toDelete$.next(this.delete);
  }

  addItem(caption: string){
    let todo = {
      listId: this.getCurrentListId(),
      caption: caption,
      isCompleted: false
    };

    this.todoItemService.addItemToTodoList(todo);
  }

  deleteList(){
    let currentListId = this.getCurrentListId();

    this.todolistsService.deleteTodoListById(currentListId);
  }
}
