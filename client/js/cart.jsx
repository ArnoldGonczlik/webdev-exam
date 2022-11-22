import * as React from "react";

export function Cart({cart, cartTotal, user}) {

    if(user === false || typeof user === 'undefined') {
        return
    }

    if(user.permissionGroup === 2) {
        return
    }

    return <div><h4>Your cart:</h4>
        <div>{cart.map((item, index) => (<div key={index}>
                <div>{item.name}</div>
                <div>{item.price} kr</div>
            </div>
        ))}</div>
        <div>Your total: {cartTotal}</div></div>

}

export default Cart;