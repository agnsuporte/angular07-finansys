import { BaseResourceModel } from '../models/base-resource.model';

import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export abstract class BaseResourceService<T extends BaseResourceModel> {

  protected http: HttpClient;

  constructor(
    protected apiPath: string,
    protected injector: Injector,
    protected josonDataToResourceFn: (josonData: any) => T
  ) {
    this.http = injector.get(HttpClient);
  }

  getAll(): Observable<T[]> {
    return this.http.get(this.apiPath).pipe(
      // O ".bind(this)" é para informar o contexto/scorpo
      // da função. Assim o contexto deverá ser: 'BaseResourceService'
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<T> {
    const url = `${this.apiPath}/${id}`;
    return this.http.get(url).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    );
  }

  create(resource: T): Observable<T> {
    return this.http.post(this.apiPath, resource).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    );
  }

  update(resource: T): Observable<T> {
    const url = `${this.apiPath}/${resource.id}`;
    return this.http.put(url, resource).pipe(
      map(() => resource),
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiPath}/${id}`;
    return this.http.delete(url).pipe(
      map(() => null),
      catchError(this.handleError)
    );
  }

  // METODOS PROTECTED

  protected handleError(error: any[]): Observable<any> {
    console.log('Erro na requisição: ', error);
    return throwError(error);
  }

  protected jsonDataToResource(jsonData: any): T {
    return this.josonDataToResourceFn(jsonData);
  }

  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach(el => resources.push(this.josonDataToResourceFn(el)));
    return resources;
  }

}
