'use strict';

import { Component } from './../../component'

export class ShoppingCart extends Component {
    constructor(options) {
        super(options.el);
        this._el = options.el;
        this._template = require('./template.html');
        this._templateFunction = _.template(this._template);

        this._items = [];
        this.render();

    }

    addItem(Item) {
        this._items.push(Item);

        this.render();
    }


    render() {
        let html = this._templateFunction({
            title:'my shopping cart',
            items: this._items
        });

        this._el.innerHTML = html;
    }
}

