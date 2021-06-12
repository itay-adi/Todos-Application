import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatIconModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule
  ]
})
export class CoreModule { }
