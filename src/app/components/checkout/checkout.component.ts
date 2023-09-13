import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup!: FormGroup;
  totalPrice:number=0;
  totalQuantity:number=0;
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];
  
  constructor(private formBuilder:FormBuilder,              private luv2ShopFormService: Luv2ShopFormService){

  }
  
  ngOnInit(): void {
    this.checkoutFormGroup=this.formBuilder.group({
      customer:this.formBuilder.group({
    
        firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        lastName:  new FormControl('', [Validators.required, Validators.minLength(2)]),
        email: new FormControl('',
                              [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      shippinAdress:this.formBuilder.group({
        street:[''],
        city:[''],
        country:[''],
        state:[''],
        zipCode:[''],

      }),
      billingAdress:this.formBuilder.group({
        street:[''],
        city:[''],
        country:[''],
        state:[''],
        zipCode:[''],

      }),
    creditCart:this.formBuilder.group({
        cardType:[''],
      nameOncard:[''],
        cardNumber:[''],
        securityCode:[''],
        expirationMonth:[''],
        expirationYear:['']
      }),
    });

    // populate credit card months

    const startMonth: number = new Date().getMonth() + 1;
    console.log("startMonth: " + startMonth);

    this.luv2ShopFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    );

    // populate credit card years

    this.luv2ShopFormService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved credit card years: " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    );

    
  }
  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }


  onSubmit(){
    console.log("handling the submit ");
    
  }
  
 

}
