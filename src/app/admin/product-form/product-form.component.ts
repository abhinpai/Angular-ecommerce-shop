import { CategoryService } from "./../../category.service";
import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../product.service";
import {
  Router,
  ActivatedRoute
} from "../../../../node_modules/@angular/router";
import "rxjs/add/operator/take";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.css"]
})
export class ProductFormComponent {
  public categories$;
  public product:any = {};
  public id;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {
    this.categoryService
      .getCategories()
      .subscribe(res => (this.categories$ = res));

    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.id)
      this.productService
        .getProduct(this.id)
        .take(1)
        .subscribe(p => {
          this.product = p;
          console.log(p);
        });
  }

  save(product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);
    this.router.navigate(["/admin/products"]);
  }

  delete() {
    if (!confirm("Are you sure want to delete this product?")) return;
    this.productService.delete(this.id);
    this.router.navigate(["/admin/products"]);
  }
}
