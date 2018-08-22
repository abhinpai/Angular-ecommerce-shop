import { IProduct } from './../../models/IProduct';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  public product$;
  public productref;


// The Below Sanpshot method is for the latest AngularFire2+ version to access 
// Node key and the value with the document format of the payload
// If developer wants only to show/view the data into the view than use ValueChanges() 
// Insted of SnapshotChanges()

  constructor(private productService: ProductService) { 
    this.productref = this.productService.getAll();
    this.product$ = this.productref.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    });
  }


  filter(seachString: string){

  }

  ngOnInit() {
  }
}
