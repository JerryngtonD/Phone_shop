'use strict';

class PhonesPage {
  constructor(options) {
    this._el = options.el;

    this._catalogue = new PhoneCatalogue({
      el: this._el.querySelector('[data-component="phone-catalogue"]')
    });

      this._cart = new ShoppingCart({
          el: this._el.querySelector('[data-component="shopping-cart"]')
      });

      setTimeout(() => {
        this._cart.addItem({id:1000});
      },1000);


      setTimeout(() => {
          this._cart.addItem({id:2000});
      },2000);


      setTimeout(() => {
          this._cart.addItem({id:3000});
      },3000);

  }
}