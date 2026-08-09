import useProduct from "../context/ProductContext";

const Home = () => {
    const { products } = useProduct();

    return (
        <>
            <h1>Home</h1>

            <h2>Products</h2>
            <hr></hr>
            <div>
                {products.map((product, index) => {
                    return (
                        <div>
                            <h3>{product.name}</h3>
                            <p>Description: {product.description}</p>
                            <p>Stock: {product.stock}</p>
                            <p>Price: {product.price}$</p>
                            <img src={`http://localhost:3000/${product.icon}`} width='150' /> 
                            <hr />
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Home;