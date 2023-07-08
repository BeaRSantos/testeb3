import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToDoList } from '../modal/ToDoList';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.scss']
})
export class ElementDialogComponent {
  element : ToDoList;
  isChange : boolean;
constructor(
  @Inject(MAT_DIALOG_DATA) 
  public data: ToDoList,
  public dialogRef: MatDialogRef<ElementDialogComponent>,
  ) {}

nOnit(): void{
  if(this.element.name != null){
    this.isChange = true;
  }
}
OnCancel(): void {
  this.dialogRef.close();
}
}
