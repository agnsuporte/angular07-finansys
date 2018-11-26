import { Component, OnInit } from '@angular/core';

import { Category } from '../shared/category.module';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(
      categories => this.categories = categories,
      error => alert('Erro ao carregar lista')
    );
  }

  deleteCategory(category) {
    const conf = confirm('Deseja excluir este item?');
    if (conf) {
      this.categoryService.delete(category.id).subscribe(
        () => this.categories = this.categories.filter(el => el !== category),
        () => alert('Erro ao tentar excluir')
      );
    }
  }

}
