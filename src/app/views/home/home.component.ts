import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ServiceToDoList } from 'src/app/core/service/serviceToDoList.component';
import { ElementDialogComponent } from 'src/app/shared/element-dialog/element-dialog.component';
import { ToDoList } from 'src/app/shared/modal/ToDoList';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
 @ViewChild(MatTable)
  table: MatTable<any>;
    dataSource: ToDoList[];
  displayedColumns: string[] = ['id', 'name', 'startDate', 'finishDate', 'description','actions'];

  constructor(private serviceToDoList: ServiceToDoList, public dialog: MatDialog){}
  
  ngOnInit(){
    this.getDados();
   
  }
  getDados() {
    var dados  = this.serviceToDoList.getToDo().subscribe(response => {
      this.dataSource = response as ToDoList[];
    });
  }
  openDialog(element: ToDoList | null): void {
    const dialogRef = this.dialog.open(ElementDialogComponent, {
      width:'250px',
      data: element == null ? {
        name: '',
        startDate: new Date(),
        finishDate: new Date(),
        description: ''
      } : {
        name: element.name,
        startDate: element.startDate,
        finishDate: element.finishDate,
        description: element.description
      }
    });
      dialogRef.afterClosed().subscribe(result  => {
        result.startDate = new Date();
        result.finishDate = new Date();
        if(result !== undefined) {
          if(!!this.dataSource.find(d=> d.id == result.id)){
            this.serviceToDoList.putToDo(result).subscribe(()=>{
              this.getDados();
            });
          }
          else {
            this.serviceToDoList.postToDo(result as ToDoList).subscribe(()=>{
              this.getDados();
            });
          }
        }        
      });
  }

  editElement(element: ToDoList): void{
    this.openDialog(element);
  }

  deleteElement(name: string): void {
    this.dataSource = this.dataSource.filter(p => p.name !== name);
  }
}