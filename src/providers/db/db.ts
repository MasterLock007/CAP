import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
/*
  Generated class for the DbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbProvider {

  db : SQLiteObject = null;

  constructor(public sqlite: SQLite) {
    console.log('Hello DbProvider Provider');
  }

  public openDb(){
    return this.sqlite.create({
        name: 'data.db',
        location: 'default' // el campo location es obligatorio
    })
    .then((db: SQLiteObject) => {
     this.db =db;
   })
  }

}
