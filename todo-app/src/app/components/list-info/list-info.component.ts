import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { TodoItem } from 'src/app/core/models/todo-item.model';
import { TodoList } from 'src/app/core/models/todo-list.model';
import { TodoitemsService } from 'src/app/core/services/todoitems.service';
import { TodolistsService } from 'src/app/core/services/todolists.service';
import { minLettersValidators, minWordsValidators } from 'src/app/validations/genral-validtors';

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
              private todoItemsService: TodoitemsService,
              private route: ActivatedRoute, //ActivatedRoute helps to get data from the URL
              private formBuilder: FormBuilder,
              private router: Router) { }

  async ngOnInit(): Promise<void> {
    let currentListId = this.getCurrentListId();

    this.list$ = this.todolistsService.getTodoListById(currentListId);
    this.items$ = this.todoItemsService.getTodoItemsPerListId(currentListId);

    this.newItem = this.formBuilder.group({
                                  //caption: ["",[Validators.required]]} : first way
                                  caption: new FormControl('',[Validators.required,  //second way
                                                               minLettersValidators(10),
                                                               minWordsValidators(3)])}
                                  );
  }

  private getCurrentListId(): number{
    return Number(this.route.snapshot.params['id']);
  }

  showDelete(){
    this.delete = !this.delete;
    this.toDelete$.next(this.delete);
  }

  async addItem(caption: string){
    let currentListId = this.getCurrentListId();

    let todo = {
      id: 0,
      listId: currentListId,
      caption: caption,
      isCompleted: false
    };

    this.todoItemsService.addItemToTodoList(todo).then(()=>{
      this.list$ = this.todolistsService.getTodoListById(currentListId);
      this.newItem.reset();
    });
  }

  deleteList(){
    let currentListId = this.getCurrentListId();

    this.todolistsService.deleteTodoListById(currentListId).then(()=>{
      this.router.navigate(['home']);
    });
  }

  async changItemCompleteStatus(currentItemId : number | undefined){
    await this.todoItemsService.markTodoItemAs(Number(currentItemId));
  }
}
