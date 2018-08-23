import { IProduct } from "./../models/IProduct";
import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { CategoryService } from "../category.service";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent {
  public product$;
  public category$;
  category: string;

  products: any[];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    this.productService
      .getAll()
      .snapshotChanges()
      .subscribe(products => (this.products = products));

    this.categoryService
      .getCategory()
      .snapshotChanges()
      .subscribe(cat => (this.category$ = cat));

    route.queryParamMap.subscribe(param => {
      this.category = param.get("category");
    });
  }
}
