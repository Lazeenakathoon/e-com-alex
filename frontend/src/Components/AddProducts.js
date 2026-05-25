import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useProducts } from '../Global/ProductsContext';
import { Navbar } from './Navbar';

export const AddProducts = () => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState(null);
    const navigate = useNavigate();
    const { addProduct: saveProduct } = useProducts();

    const addProduct = (event) => {
        event.preventDefault();

        if (!productName.trim() || !productPrice || !productImage) {
            toast.error('Please fill in all product details.');
            return;
        }

        if (!['image/jpeg', 'image/png'].includes(productImage.type)) {
            toast.error('Please select a valid image type: JPG or PNG.');
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            saveProduct({
                name: productName.trim(),
                price: Number(productPrice),
                image: reader.result
            });

            toast.success('Product added successfully!');
            navigate('/', { replace: true });
        };

        reader.onerror = () => {
            toast.error('Unable to upload product image.');
        };

        reader.readAsDataURL(productImage);
    };

    return (
        <>
            <Navbar />
            <div className="container">
                <h2>Add Product</h2>
                <form onSubmit={addProduct}>
                    <label htmlFor="product-name">Product Name</label>
                    <input
                        id="product-name"
                        type="text"
                        value={productName}
                        onChange={(event) => setProductName(event.target.value)}
                    />

                    <label htmlFor="product-price">Product Price</label>
                    <input
                        id="product-price"
                        type="number"
                        min="1"
                        value={productPrice}
                        onChange={(event) => setProductPrice(event.target.value)}
                    />

                    <label htmlFor="file">Product Image</label>
                    <input
                        id="file"
                        type="file"
                        accept="image/png, image/jpeg"
                        onChange={(event) => setProductImage(event.target.files[0])}
                    />

                    <button type="submit">ADD</button>
                </form>
            </div>
        </>
    );
};
