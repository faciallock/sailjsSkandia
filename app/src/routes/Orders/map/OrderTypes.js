import React, { PureComponent, Fragment } from 'react';



export class OrderTypes {

    static types() {
        return {
            ZSD: "Shades",
            ZSH: "Shutters",
            ZHZ: "Horizontal Blind",
            ZVT: "Vertical Blind",
            ZMS: "Miscellaneous",
            getRequest: function (aColumn) {
                var value = eval("this." + aColumn);
                return value;
            }
        }
    }
}
