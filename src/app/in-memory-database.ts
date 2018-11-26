import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Category } from './pages/categories/shared/category.module';

export class InMemoryDatabase implements InMemoryDbService {

  /**
   * Para o funcionamento correto é necessário
   * implementar esse método: createDb.
   */
  createDb() {
    const categories: Category[] = [
      {id: 1, name: 'Lazer', description: 'Matuta, Samanaú, 51 uma boa ideia'},
      {id: 2, name: 'Saúde', description: 'Churrasco :)'},
      {id: 3, name: 'Salário', description: 'Só alegria !!!'},
      {id: 4, name: 'Transporte', description: 'Motinha cheia de gás'},
      {id: 5, name: 'Moradia', description: 'Minha casa minha vida'}
    ];
    return {categories};
  }

}
