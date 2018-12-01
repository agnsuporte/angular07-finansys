import { BaseResourceModel } from '../../../shared/models/base-resource.model';

export class Category extends BaseResourceModel {

  constructor(
    public id?: number,
    public name?: string,
    public description?: string
  ) {
    super();
  }

  static fromJson(josonData: any): Category {
    return Object.assign(new Category(), josonData);
  }

}
