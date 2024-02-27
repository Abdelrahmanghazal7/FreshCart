import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const WishListContext = createContext()

export default function WishListContextProvider(props) {

    let [heart, setHeart] = useState([]);

    let [totalItems, setTotalItems] = useState(0);

    let [wishlists, setWishlist] = useState([]);

    let [loading, setLoading] = useState(true);

    let headers = { token: localStorage.getItem('userToken') }

    async function addProductToWishList(id) {
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            productId: id
        }, {
            headers
        }).then(res => res).catch(err => err)
    }

    async function getLoggedWishlist() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers
        }).then(res => res).catch(err => err)
    }

    async function removeItem(id) {
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
            headers
        }).then(res => res).catch(err => err)
    }

    async function getWishlist() {
        const { data } = await getLoggedWishlist();
        setHeart(data)
        setTotalItems(data?.count);
        setWishlist(data?.data);
        setLoading(false);
    }

    useEffect(() => {
        getWishlist();
    }, [])


    return <WishListContext.Provider value={{ addProductToWishList, getLoggedWishlist, getWishlist, removeItem, heart, setHeart, wishlists, loading, totalItems }}>{props.children}</WishListContext.Provider>
}