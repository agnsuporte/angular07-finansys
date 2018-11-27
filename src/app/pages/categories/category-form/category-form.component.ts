import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs/operators';
import toastr from 'toastr';

import { Category } from '../shared/category.module';
import { CategoryService } from '../shared/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit, AfterContentChecked {

  pageTitle: string;
  currentAction: string;
  serverErrorMesseges: string[] = null;
  submittingForm = false;
  category: Category = new Category();
  categoryForm: FormGroup;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.setCurrentAction();
    this.builderCategoryForm();
    this.loadCategory();
  }

  ngAfterContentChecked() {
    this.setPageTitle();
  }

  submitForm() {
    this.submittingForm = true;

    if (this.currentAction === 'new') {
      this.createCategory();
    } else {
      this.updateCategory();
    }
  }

  // METODOS PRIVADOS

  private setCurrentAction() {
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  private builderCategoryForm() {
    this.categoryForm = this.formBuilder.group({
      id: [null],
      name: [null, [Validators.required, Validators.minLength(2)]],
      description: [null]
    });
  }

  private loadCategory() {
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.categoryService.getById(+params.get('id')))
      ).subscribe(
        (category) => {
          this.category = category;
          this.categoryForm.patchValue(category); // Preenche o form com seus respectivos valores.
        },
        (error) => alert('Ocorreu um erro no servidor!')
      );
    }
  }


  private setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Cadastro de Nova Categoria';
    } else {
      const categoryName = this.category.name || '';
      this.pageTitle = 'Editando Categoria: ' + categoryName;
    }
  }

  private createCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoryService.create(category).subscribe(
      catgory => this.actionsForSuccess(catgory),
      error => this.actionsForError(error)
    );
  }

  private updateCategory() {
    const category: Category = Object.assign(new Category(), this.categoryForm.value);

    this.categoryService.update(category).subscribe(
      catgory => this.actionsForSuccess(catgory),
      error => this.actionsForError(error)
    );
  }

  private actionsForSuccess(category: Category) {
    toastr.success('Solicitação recebida com sucesso!');

    /**
     * Redirecionamento
     * "skipLocationChange" evita que a navegação seja registrada no Histório do browser
     * // Redireciona para a categoria recem criada.
      () => this.router.navigate(['categories', category.id, 'edit'])
     */

    this.router.navigateByUrl('categories', {skipLocationChange: true}).then(
      () => this.router.navigate(['categories', category.id, 'edit'])
    );
  }

  private actionsForError(error) {
    toastr.error('Ocorreu um error ao processar sua solicitação.');
    this.submittingForm = false;

    if (error.state === 422) {
      this.serverErrorMesseges = JSON.parse(error._body).errors;
    } else {
      this.serverErrorMesseges = ['Falha na comunicação com o servidor']
    }
  }

}
