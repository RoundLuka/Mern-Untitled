import { useState } from "react";
import useAuth from "../context/authContext";
import useProduct from "../context/ProductContext";

const Admin = () => {
    const { user, logout } = useAuth();
    const { products, createProduct, deleteProduct, updateProduct } = useProduct();

    const [updating, setUpdating] = useState(null);

    function addProduct(e) {
        e.preventDefault();

        const data = {
            name: e.target.name.value,
            description: e.target.description.value,
            stock: e.target.stock.value,
            price: e.target.price.value,
            icon: e.target.image.files[0]
        }

        createProduct(data);

        e.target.reset();
    }

    function editProduct (e) {
        e.preventDefault();

        const data = {
            name: e.target.name.value,
            description: e.target.description.value,
            stock: e.target.stock.value,
            price: e.target.price.value,
            icon: e.target.image.value
        }

        updateProduct(updating, data);
        setUpdating(null)
    }

    return (
        <>
            <h1>Admin</h1>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <button onClick={logout}>Logout</button>

            <h2>Add Product</h2> 
            <form onSubmit={addProduct}>
                <input type="text" name="name" placeholder="Name" required /> <br />
                <input type="text" name="description" placeholder="Description" required /> <br />
                <input type="number" name="stock" placeholder="Stock" required /> <br />
                <input type="number" name="price" placeholder="Price" required /> <br />
                <input type="file" name="image" /> <br />
                <button type="Submit">Add product</button>
            </form>

            <h2>Products</h2>
            <hr />
            <div>
                {products.map((product, index) => {
                    return (
                        <div>
                            {updating === product._id ? (
                                <>
                                    <form onSubmit={editProduct}>
                                        <input type="text" name="name" placeholder={product.name} required /> <br />
                                        <input type="text" name="description" placeholder={product.description} required /> <br />
                                        <input type="number" name="stock" placeholder={product.stock} required /> <br />
                                        <input type="number" name="price" placeholder={product.price} required /> <br />
                                        <input type="text" name="image" placeholder={product.icon} required /> <br />
                                        <button type="Submit">Update</button>
                                    </form>
                                </>
                            ) : (
                                <>
                                    <h3>{product.name}</h3>
                                    <p>Description: {product.description}</p>
                                    <p>Stock: {product.stock}</p>
                                    <p>Price: {product.price}$</p>
                                    <img src={`http://localhost:3000/${product.icon}`} width='150' /> 
                                    <button onClick={() => deleteProduct(product._id)}>Delete</button>
                                    <button onClick={() => setUpdating(product._id)}>Edit</button>
                                </>
                            )}

                            <hr />
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Admin;