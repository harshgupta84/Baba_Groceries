import { useState, useEffect } from 'react';
import axios from 'axios';

function CategoriesAPI() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [callback, setCallback] = useState(false);

    useEffect(() => {
        const getCategories = async () => {
            try {
                setLoading(true); // Set loading to true before making the request
                const res = await axios.get('/api/category');
                setCategories(res.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setLoading(false); // Set loading to false after the request is complete
            }
        };

        getCategories();
    }, [callback]);

    return {
        categories: [categories, setCategories],
        loading: [loading, setLoading],
        callback: [callback, setCallback],
    };
}

export default CategoriesAPI;
