'use strict';

class PhonesPage {
  constructor(options) {
    this._el = options.el;


      this._cart = new ShoppingCart({
          el: this._el.querySelector('[data-component="shopping-cart"]')
      });

    this._catalogue = new PhoneCatalogue({
        el: this._el.querySelector('[data-component="phone-catalogue"]')
    });

    this._catalogue.on('phoneSelected', (event) => {
      this._cart.addItem({id:event.detail});
    });

  }
}