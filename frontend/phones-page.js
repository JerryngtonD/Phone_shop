'use strict';

import  { ShoppingCart } from './components/shopping-cart';
import  { PhoneCatalogue } from './components/phone-catalogue';
import  { PhoneViewer  } from './components/phone-viewer';
import { Search } from './components/search';


export class PhonesPage {
  constructor(options) {
    this._el = options.el;


      this._cart = new ShoppingCart({
          el: this._el.querySelector('[data-component="shopping-cart"]')
      });

    this._catalogue = new PhoneCatalogue({
        el: this._el.querySelector('[data-component="phone-catalogue"]')
    });

    this._loadPhones();

      this._viewer = new PhoneViewer({
          el: this._el.querySelector('[data-component="phone-viewer"]')
      });


    this._catalogue.on('phoneSelected',this._onPhoneSelected.bind(this));


    this._viewer.on('back',() => {
      this._viewer.hide();
      this._catalogue.show();
    });

    this._search = new Search({
        el: this._el.querySelector('[data-component="search"]')
    });

      this._viewer.on('add',(event) => {
        let phoneDetails = event.detail;

          this._cart.addItem(phoneDetails);
      });


      this._search.on('valueChanged', (event) => {
          let searchValue = event.detail;

          this._loadPhones(searchValue)
      });

  }


  _onPhoneSelected(event) {
      let phoneId = event.detail;
      var loadPhonePromise = fetch(`/data/phones/${phoneId}.json`)
          .then((response) => {
                  if (response.status == 200) {
                      return response.json()
                  }
                  else {
                      Promise.reject('something went wrong')
                  }

              }
          );


      let extraActionPromise = new Promise(
          (resolve, reject) => {

              let onExtraAction = () => {
                  resolve();

                  this._catalogue.off('extraAction',onExtraAction);
              };
              this._catalogue.on('extraAction',onExtraAction)
          }
      );

      Promise.all([extraActionPromise,loadPhonePromise])
          .then(
              (results) => {
                  let phoneDetails = results[1];

                  this._catalogue.hide();
                  this._viewer.showPhone(phoneDetails);
              }
          );

      // extraActionPromise
      //     .then(() => loadPhonePromise)
      //     .then((phoneDetails) => {
      //         this._catalogue.hide();
      //         this._viewer.showPhone(phoneDetails);
      //     });
      //
      // extraActionPromise.then (() => {
      //     loadPhonePromise.then((phoneDetails) => {
      //         this._catalogue.hide();
      //         this._viewer.showPhone(phoneDetails);
      //     })
      // });

  }

  _loadPhones(query){
      let url = `/data/phones/phones.json`;


      if (query)  {
          url +=`?query=${query}`;
      }

      fetch(url)
          .then((response) => {
            if (response.status == 200) {
                return response.json()
            }
            else {
                Promise.reject('something went wrong')
            }
          })
          .then (
              (phones) => {
                  // untill our server can filter phones
                  let filterPhones = this._filterPhones(phones, query);
                  this._catalogue.showPhones(filterPhones);
              }
          );
      }

   _filterPhones(phones,query) {
      if (!query) {
          return phones;
      }

      let normalizedQery = query.toLowerCase();
          return phones.filter((phone) => {
              return phone.name.toLowerCase().includes(normalizedQery);

          });
      }

}