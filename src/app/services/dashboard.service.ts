import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
   userSubject = new BehaviorSubject(null);
   FamilyData:any[]= [
    {name: 'Ahmed Khurrum', relation: 'Base Node'},
    {name: 'Kareem Khurrum', relation: 'Brother'},
    {name: 'Sultan Khurrum', relation: 'Brother'},
    {name: 'Azhar Khurrum', relation: 'Brother'},
    {name: 'Faiz Ahmed', relation: 'Son'},
    {name: 'Hina Khurrum', relation: 'Wife'},
    {name: 'Shugufta', relation: 'Mother'},
    {name: 'Alina', relation: 'Mother-in-Law'},
    {name: 'Khurrum Javed', relation: 'Father'},
    {name: 'Zaid', relation: 'father-in-Law'},
    {name: 'Sabiha', relation: 'Sister'},
 ]
 
  constructor() { }
  getFamily(){
    return this.FamilyData
  }
  deleteFamilyData(index:any,list:any[]){
    return list.splice(index,1)
  }
  setUser(value:any){
    this.userSubject.next(value)
  }
  setLocalStorage(key:string,value:any){
    localStorage.setItem(key,JSON.stringify(value));
  }
   getLocalStorage(key:string){
     return localStorage.getItem(key)
   }
   clearLocalstorage(){
    localStorage.clear();
   }
   SearchBySpecificKeyInData(SearchBy: string, SearchValue: string, SearchArray: any[]) {
    if (SearchBy != null && SearchValue != null) {
      return SearchArray.filter((item) => {
        return ((item[SearchBy] != null ? (item[SearchBy] + '') : '')
          .toUpperCase()
          .search((SearchValue + '')
            .toUpperCase()) !== -1);
      });
    } else {
      return [...SearchArray]
    }
  }
}
export enum User {
  Admin = 1,
  Super
}
