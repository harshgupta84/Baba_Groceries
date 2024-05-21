import { useState, useEffect } from 'react';
import axios from 'axios';

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            try {
                setLoading(true); // Set loading to true before making the request

                const res = await axios.get('/user/infor', {
                    headers: { Authorization: token },
                });

                setIsLogged(true);
                res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
                setCart(res.data.cart);
            } catch (err) {
                alert(err.response.data.msg);
            } finally {
                setLoading(false); // Set loading to false after the request is complete
            }
        };

        if (token) {
            getUser();
        }
    }, [token]);

    const addCart = async (product) => {
        if (!isLogged) return alert('Please login to continue buying');

        const check = cart.every((item) => {
            return item._id !== product._id;
        });

        if (check) {
            setCart([...cart, { ...product, quantity: 1 }]);

            await axios.patch(
                '/user/addcart',
                { cart: [...cart, { ...product, quantity: 1 }] },
                {
                    headers: { Authorization: token },
                }
            );
        } else {
            alert('This product has been added to cart.');
        }
    };

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart,
        history: [history, setHistory],
        loading: [loading, setLoading], // Include loading state in the return object
    };
}

export default UserAPI;
