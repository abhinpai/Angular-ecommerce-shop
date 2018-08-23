import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {

  public category$;
  @Input('category') category;

  constructor(private categoryService: CategoryService) { 

    this.categoryService
    .getCategory()
    .snapshotChanges()
    .subscribe(cat => (this.category$ = cat));

  }

  
}
