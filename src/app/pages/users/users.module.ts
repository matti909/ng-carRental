import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {LoginComponent} from './components/login/login.component';
import {MaterialModule} from 'src/app/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SignupComponent} from './components/signup/signup.component';
import { UsersListComponent } from './components/users-list/users-list.component';

@NgModule({
  declarations: [LoginComponent, SignupComponent, UsersListComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class UsersModule {}
