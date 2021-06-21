import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { TodoList } from 'src/app/core/models/todo-list.model';
import { TodolistsService } from 'src/app/core/services/todolists.service';
import { maxLettersValidators, minLettersValidators, minWordsValidators } from 'src/app/validations/genral-validtors';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {
  listForm!: FormGroup;

  list$!: Observable<TodoList | undefined>;
  id$!: Observable<Number>;
  
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private todoListService: TodolistsService,
              private router: Router) { }

  async ngOnInit(){
    this.initObservers();
    this.initForms();
  }

  private initObservers(){
    let a = this.id$ = this.route.params.pipe(
      map(prms => Number(prms['id']))
    );

    this.list$ = this.id$.pipe(
      switchMap(id => this.todoListService.getTodoListById(Number(id)))
    )
  }

  async initForms(){
    this.initListEditForm();

    if(this.getCurrentListId() > 0){
      let initialTodoList: TodoList = await this.getCurrentTodoListProperties();
      this.listForm.reset(initialTodoList);
    }
  }

  private initListEditForm(){
    this.listForm = this.formBuilder.group(
      {
        id: new FormControl(),
        caption: new FormControl('',[Validators.required, maxLettersValidators(25)]),
        description: new FormControl('',[Validators.required, minWordsValidators(10), minLettersValidators(30)]),
        icon: new FormControl('',[Validators.required]),
        color: new FormControl('',[Validators.required]),
      }
    );
  }

  async getCurrentTodoListProperties(): Promise<TodoList>{
    let currentTodoListProperties: TodoList = {
      id: Number(await this.list$.pipe(first(), map(l => l?.id)).toPromise()),
      caption: String(await this.list$.pipe(first(), map(l => l?.caption)).toPromise()),
      description: String(await this.list$.pipe(first(), map(l => l?.description)).toPromise()),
      icon: String(await this.list$.pipe(first(), map(l => l?.icon)).toPromise()),
      color: String(await this.list$.pipe(first(), map(l => l?.color)).toPromise())
    }

    return currentTodoListProperties;
  }

  private getCurrentListId(): number{
    return Number(this.route.snapshot.params['id']);
  }

  save(){
    let id = this.getCurrentListId();

    if(id > 0){
      console.log("")
      this.updateList(id);
    }
    
    else if(id === -1){
      this.addNewList(this.listForm.value);
    }

    else{
      this.router.navigate(['List_not_found']);
    }
  }

  updateList(id: number){
    this.todoListService.setListByID(this.listForm.value).then(()=>{
      this.router.navigate(['lists', id]);
    });
  }

  async addNewList(todoList: TodoList){
    this.todoListService.addNewTodoList(todoList).then(()=>{
      this.router.navigate(['lists']);
    });
  }

  get(filedName: string){
    return this.listForm.get(filedName);
  }
}
