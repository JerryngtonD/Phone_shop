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

      this._viewer = new PhoneViewer({
          el: this._el.querySelector('[data-component="phone-viewer"]')
      });


    this._catalogue.on('phoneSelected',this._onPhoneSelected.bind(this));


    this._viewer.on('back',() => {
      this._viewer.hide();
      this._catalogue.show();
    });

      this._viewer.on('add',(event) => {
        let phoneDetails = event.detail;

          this._cart.addItem(phoneDetails);
      });

  }


  _onPhoneSelected(event) {

      let phoneId = event.detail;


      let xhr = new XMLHttpRequest();

      xhr.open('GET',`/data/phones/${phoneId}.json`, true);

      xhr.send();

      xhr.onload = () => {
          if (xhr.status !== 200) {
              alert(xhr.status + ': ' + xhr.statusText);
          } else {
              let phoneDetails = JSON.parse(xhr.responseText);
              this._viewer.showPhone(phoneDetails);
              this._catalogue.hide();
          }
      };
  }

}