import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext()

export default function CartContextProvider(props) {

    let headers = { token: localStorage.getItem('userToken') }

    async function addProductToCart(id) {
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId: id
        }, {
            headers
        }).then(res => res).catch(err => err)
    }

    async function getLoggedCart() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        }).then(res => res).catch(err => err)
    }

    async function removeItem(id) {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            headers
        }).then(res => res).catch(err => err)
    }

    async function clearCart() {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        }).then(res => res).catch(err => err)
    }

    async function updateItemQuantity(id, count) {
        return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            count
        }, {
            headers
        }).then(res => res).catch(err => err)
    }

    let [cartId, setCartId] = useState('')

    async function payment(shippingAddress) {
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
            shippingAddress
        }, {
            headers
        })
            .then(res => res).catch(err => err)
    }

    const [numOfCartItems, setNumOfCartItem] = useState(0);

    async function initialCartCount() {
        const { data } = await getLoggedCart()
        setNumOfCartItem(data?.numOfCartItems)
        setCartId(data?.data._id)
    }

    useEffect(() => {
        initialCartCount()
    }, [])

    return <cartContext.Provider value={{ addProductToCart, getLoggedCart, removeItem, clearCart, updateItemQuantity, numOfCartItems, setNumOfCartItem, payment }}>{props.children}</cartContext.Provider>
}