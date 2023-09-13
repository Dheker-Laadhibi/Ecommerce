import { CartService } from './../../services/cart.service';
import { CartItem } from './../../common/cart-item';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
 CartItems:CartItem[]=[];
 totalPrice:number = 0;
 totalQuality :number=0;
 
 constructor(private CartService :CartService){


 }
 
 
  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
   // get a handle to the cart items


this.CartItems=this.CartService.cartItems;


//subscribe to the cart total price
this.CartService.totalPrice.subscribe(
  data=>this.totalPrice=data
);




//subscribe to totla quantity
this.CartService.totalQuantity.subscribe(
  data=>this.totalPrice=data
);







//compute cart total price an quality
this.CartService.computeCartTotals();



  }

  incrementQuantity(ct :CartItem){
this.CartService.addToCart(ct);



  }
decrementQuantity(ct :CartItem){
  this.CartService.decrementQuantity(ct);
}



remove(ct:CartItem){
  this.CartService.remove(ct);
}
}
