import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { TodoList } from 'src/app/core/models/todo-list.model';
import { TodolistsService } from 'src/app/core/services/todolists.service';
import { maxLettersValidators, minWordsValidators } from 'src/app/validations/genral-validtors';

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

  async ngOnInit(): Promise<void> {
    this.initObservers();
    this.initForms();
  }

  private initObservers(){
    this.id$ = this.route.params.pipe(
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
        description: new FormControl('',[Validators.required, minWordsValidators(2)]),
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
      this.saveChanges(id);
    } 
    
    else{
      this.addNewList(this.listForm.value);
    }
  }

  saveChanges(id: number){
    this.todoListService.setListByID(this.listForm.value);
    this.router.navigate(['lists', id]);
  }

  addNewList(todoList: TodoList){
    this.todoListService.addNewTodoList(todoList);
    this.router.navigate(['lists']);
  }
}
