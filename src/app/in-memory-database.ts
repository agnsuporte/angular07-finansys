import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Category } from './pages/categories/shared/category.module';
import { Entry } from './pages/entries/shared/entry.module';

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

    const entries: Entry[] = [
      {
        id: 1,
        name: 'Gasolina',
        categoryId: categories[0].id,
        category: categories[0],
        paid: true,
        date: '27/11/2018',
        amount: '55,69',
        type: 'expense',
        description: 'Saidinha com a patroa'
      } as Entry,
      {
        id: 2,
        name: 'Pizzaria',
        categoryId: categories[0].id,
        category: categories[0],
        paid: true,
        date: '27/11/2018',
        amount: '105,90',
        type: 'expense',
        description: 'Lanche com a patroa'
      } as Entry,
      {
        id: 3,
        name: 'Apto',
        categoryId: categories[4].id,
        category: categories[4],
        paid: false,
        date: '30/11/2018',
        amount: '579,87',
        type: 'expense',
        description: 'Prestação Financiamento'
      } as Entry,
      {
        id: 4,
        name: 'Motinha Manhosa',
        categoryId: categories[3].id,
        category: categories[3],
        paid: true,
        date: '05/12/2018',
        amount: '423,25',
        type: 'revenue',
        description: 'Serviço de moto-taxi'
      } as Entry,
      {
        id: 5,
        name: 'Dentista',
        categoryId: categories[1].id,
        category: categories[1],
        paid: false,
        date: '06/12/2018',
        amount: '150,25',
        type: 'expense',
        description: 'Limpeza!'
      } as Entry,
      {
        id: 6,
        name: 'Empresa',
        categoryId: categories[2].id,
        category: categories[2],
        paid: false,
        date: '08/12/2018',
        amount: '1500,25',
        type: 'revenue',
        description: 'Recebimento de Proventos'
      } as Entry
    ];

    return {categories, entries};
  }

}
