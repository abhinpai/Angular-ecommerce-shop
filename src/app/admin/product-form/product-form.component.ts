import { CategoryService } from "./../../category.service";
import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../product.service";
import { Router } from "../../../../node_modules/@angular/router";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent {
  public categories$;

  constructor(
    private categoryService: CategoryService, 
    private router: Router,
    private productService: ProductService) {
    this.categoryService.getCategories().subscribe(res => (this.categories$ = res));
  }

  save(product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
}
