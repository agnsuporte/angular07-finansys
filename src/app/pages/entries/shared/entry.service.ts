import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { BaseResourceService  } from '../../../shared/services/base-resource.service';
import { CategoryService } from '../../categories/shared/category.service';
import { Entry } from './entry.module';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(protected injector: Injector, private categoryService: CategoryService) {
    super('api/entries', injector);
  }

  create(entry: Entry): Observable<Entry> {

    /**
     * Isto para suprir a necessidade do in-memory-database que
     * nao recebe a categoria do objeto recem criado.
     */
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap( category => {
        entry.category = category;
        return super.create(entry);
      })
    );

  }

  update(entry: Entry): Observable<Entry> {

    /**
     * Isto para suprir a necessidade do in-memory-database que
     * nao recebe a categoria do objeto recem criado.
    */
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap( category => {
        entry.category = category;
        return super.update(entry);
      })
    );
  }

  // METODOS protected

  protected jsonDataToResource(jsonData: any): Entry {
    return Entry.fromJson(jsonData);
  }

  protected jsonDataToResources(jsonData: any[]): Entry[] {
    const entries: Entry[] = [];
    // Retorna um objeto Entry.
    jsonData.forEach(el => {
      const entry = Entry.fromJson(el);
      entries.push(entry);
    });
    return entries;
  }

}
