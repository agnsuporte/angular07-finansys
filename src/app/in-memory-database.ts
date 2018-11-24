import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryDatabase implements InMemoryDatabase {

  /**
   * Para o funcionamento correto é necessário
   * implementar esse método: createDb.
   */
  createDb() {

    const categories = [
      {id: 1, name: 'Lazer', description: 'Matuta, Samanaú, 51 uma boa ideia'},
      {id: 2, name: 'Saúde', description: 'Churrasco :)'},
      {id: 3, name: 'Salário', description: 'Só alegria !!!'},
      {id: 4, name: 'Transporte', description: 'Motinha cheia de gás'},
    ];

    return {categories};

  }

}
