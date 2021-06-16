import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, switchMap } from 'rxjs/operators';
import { TodoList } from 'src/app/core/models/todo-list.model';
import { TodolistsService } from 'src/app/core/services/todolists.service';

@Component({
  selector: 'app-list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {
  listEditForm!: FormGroup;

  list$!: Observable<TodoList | undefined>;
  id$!: Observable<Number>; 
  
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private todoListService: TodolistsService) { }

  async ngOnInit(): Promise<void> {
    this.initObservers();

    this.listEditForm = this.formBuilder.group(
      {
        caption: new FormControl('',[Validators.required]),
        description: new FormControl('',[Validators.required]),
        imageURL: new FormControl('',[Validators.required]),
        color: new FormControl('',[Validators.required]),
      }
    );

    let initialTodoList: TodoList = {
      id: await this.list$.pipe(first(), map(l => l?.id)).toPromise(),
      caption: String(await this.list$.pipe(first(), map(l => l?.caption)).toPromise()),
      description: String(await this.list$.pipe(first(), map(l => l?.description)).toPromise()),
      imageURL: String(await this.list$.pipe(first(), map(l => l?.imageURL)).toPromise()),
      color: String(await this.list$.pipe(first(), map(l => l?.color)).toPromise())
    }

    this.listEditForm.reset(initialTodoList);
  }

  private initObservers(){
    this.id$ = this.route.params.pipe(
      map(prms => Number(prms['id']))
    );

    this.list$ = this.id$.pipe(
      switchMap(id => this.todoListService.getTodoListById(Number(id)))
    )
  }

  saveChanges(){
    console.log("Saved");
  }
}
