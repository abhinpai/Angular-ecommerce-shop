import { IProduct } from "./../models/IProduct";
import { Component, OnInit } from "@angular/core";
import { ProductService } from "../product.service";
import { CategoryService } from "../category.service";
import { ActivatedRoute } from "@angular/router";
import { switchMap } from "rxjs/operators";
import "rxjs/add/operator/switchMap";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent {
  public product$;
 
  category: string;
  public filteredProduct: any[];

  public products: any[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    
  ) {
    this.productService
      .getAll()
      .snapshotChanges()
      .subscribe(products => {
        this.products = products;
        route.queryParamMap.subscribe(param => {
          this.category = param.get("category");
          this.filteredProduct = this.category
            ? this.products.filter(
                p => p.payload.val().category === this.category
              )
            : this.products;
        });
      });
    }

}
