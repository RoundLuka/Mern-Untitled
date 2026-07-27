import { useContext, createContext, useState, useEffect } from "react";

const productContext = createContext();

const useProduct = () => useContext(productContext);

export default useProduct;

const API_URL = "http://localhost:3000/api/products"

export const ProductContextProvider = ({children}) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    const createProduct = async (prodInfo) => {
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(prodInfo)
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message)
            }

            alert(data.message)
            setProducts((prev) => [...products, data.newProduct])

        } catch (err) {
            alert(err)
        }
    }
    
    const getProducts = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message)
            }
            alert(data.message)
            setProducts(data.products)
        } catch(err) {
            alert(err)
        }
    }

    const deleteProduct = async(id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            })

            if(!response.ok) {
                return alert("Couldn't delete the product")
            }
            alert("Product successfully deleted")

            const filteredProducts = products.filter((p) => p._id !== id)
            setProducts(filteredProducts)
        } catch (err) {
            alert(err)
        }
    }

    const updateProduct = async (id, newInfo) => {
        try {
            const response = await fetch (`${API_URL}/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newInfo)
            })

            const data = await response.json();

            if(!response.ok) {
                throw new Error(data.message)
            }

            alert(data.message)

            getProducts();
        } catch (err) {
            alert(err)
        }

    }


    return (
        <productContext.Provider value={{products, createProduct, deleteProduct, updateProduct}} >
            {children}
        </productContext.Provider>
    )
}