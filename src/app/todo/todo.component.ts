import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validator, Validators} from '@angular/forms'
import { iTask } from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todoForm !: FormGroup;
  tasks:iTask [] = [];
  inProgress:iTask [] = [];
  done:iTask[] = [];
  updateId !:any;
  isEditEnabled:boolean = false;
  constructor(private fb:FormBuilder) { }
  
  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item:["",Validators.required]
    })
  }
  addTask(){
    this.tasks.push({
      description:this.todoForm.value.item,
      done:false
    })
    this.todoForm.reset()
  }
  deleteTask(i:number){
    this.tasks.splice(i,1)
  }
  deleteDoneTask(i:number){
    this.done.splice(i,1)
  }
  deleteInProgressTask(i:number){
    this.inProgress.splice(i,1)
  }

  editTask(i:number,item:iTask){
    this.todoForm.controls["item"].setValue(item.description)
    this.updateId = i
    this.isEditEnabled = true
    // this.todoForm.value.item = item
  }
  updateTask(){
    const updatedItem = this.todoForm.value.item
    console.log({updatedItem})
    this.tasks[this.updateId].description = updatedItem
    this.tasks[this.updateId].done = false
    this.todoForm.reset()
    this.updateId = undefined
    this.isEditEnabled =false
  }
  drop(event: CdkDragDrop<iTask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
