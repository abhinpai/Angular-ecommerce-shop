import { AngularFireDatabase } from "angularfire2/database";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/take";

@Injectable({
  providedIn: "root"
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  public createCart() {
    return this.db.list("/shopping-carts").push({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreateCartId() {
    let cartId = localStorage.getItem("cartId");
    if (cartId) return cartId;

    let result = await this.createCart();
    localStorage.setItem("cartId", result.key);
    return result.key;
  }

  private getCart(cartId: String) {
    return this.db.object("/shopping-carts/" + cartId);
  }

  async addToCart(product) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.db.object(
      "/shopping-carts/" + cartId + "/items/" + product.key
    );
    item$
      .snapshotChanges()
      .take(1)
      .subscribe((item : any)=> {
        if (item.payload.exists())
          item$.update({ quantity: item.payload.val().quantity + 1 });
        else item$.set({ product: product.payload.val(), quantity: 1 });
      });
  }
}
