import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError} from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';

import { Entry } from './entry.module';
import { CategoryService } from '../../categories/shared/category.service';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  private apiPath = 'api/entries';

  constructor(private http: HttpClient, private categoryService: CategoryService) { }

  getAll(): Observable<Entry[]> {
    return this.http.get(this.apiPath).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntries)
    );
  }

  getById(id: number): Observable<Entry> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError),
      map(this.jsonDataToEntry)
    );
  }

  create(entry: Entry): Observable<Entry> {

    // return this.http.post(this.apiPath, entry).pipe(
    //   catchError(this.handleError),
    //   map(this.jsonDataToEntry)
    // );

    /**
     * Isto para suprir a necessidade do in-memory-database que
     * nao recebe a categoria do objeto recem criado.
     */
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap( category => {
        entry.category = category;

        return this.http.post(this.apiPath, entry).pipe(
          catchError(this.handleError),
          map(this.jsonDataToEntry)
        );
      })
    );

  }

  update(entry: Entry): Observable<Entry> {
    const url = `${this.apiPath}/${entry.id}`;

    // return this.http.put(url, entry).pipe(
    //   catchError(this.handleError),
    //   map(() => entry)
    // );

    /**
     * Isto para suprir a necessidade do in-memory-database que
     * nao recebe a categoria do objeto recem criado.
    */
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap( category => {
        entry.category = category;

        return this.http.put(url, entry).pipe(
          catchError(this.handleError),
          map(() => entry)
        );
      })
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError),
      map(() => null)
    );
  }

  // METODOS PRIVADOS

  private handleError(error: any[]): Observable<any> {
    console.log('Erro na requisição: ', error);
    return throwError(error);
  }

  private jsonDataToEntry(jsonData: any): Entry {
    return Object.assign(new Entry, jsonData);
  }

  private jsonDataToEntries(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];
    // Retorna um objeto Entry.
    jsonData.forEach(el => {
      const entry = Object.assign(new Entry, el);
      entries.push(entry);
    });
    return entries;
  }

}
