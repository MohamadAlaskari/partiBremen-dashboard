import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getUsers() {
    return [
      { name: 'Max', email: "sassyboi69@gmail.com" },
      { name: 'Anna', email: "kussgehtraus@gmail.com" },
      { name: 'Peter', email: "prettyprincess@outlook.com" },
      { name: 'Gustav', email: "flighhigh@outlook.com" },
      { name: 'Wolfgang', email: "onthe@outlook.com" }
    ];
  }
}
