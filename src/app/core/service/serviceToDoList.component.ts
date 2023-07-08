import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { inject } from '@angular/core/testing';
import { ToDoList } from 'src/app/shared/modal/ToDoList';

@Injectable({
  providedIn: 'root'
})


export class ServiceToDoList {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'      
   })
  }
  
 constructor(private http:HttpClient){ }
 getToDo(){
   return this.http.get(`https://localhost:7051/v1/ToDoList`);
  }
  postToDo(toDo : ToDoList){
    return this.http.post(`https://localhost:7051/v1/ToDoList`, JSON.stringify(toDo), this.httpOptions)
  }
  putToDo(toDo : ToDoList){
    return this.http.put(`https://localhost:7051/v1/ToDoList`, toDo);
  }
  deleteToDo(id : number){
     return this.http.delete(`https://localhost:7051/v1/ToDoList/${id}`);
   }

}
