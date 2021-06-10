import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements OnInit {
  developerName!: string;
  today!: string;

  lists = 2;
  todoItems = 3;
  activeItems = 2;
  
  constructor() {
    
  }

  ngOnInit(): void {
    this.developerName = "Itay Adi Yosef";
    this.today = new Date().toLocaleDateString('en-GB');
  }
}
