import { useEffect, useState } from 'react';

function HomeAdminProducts(){
    const [products, setProducts] = useState([]);
    async function getProducts() {
        try {
            const response = await fetch(`https://parcial3-rouge.vercel.app/v1/restaurant/products`);
            const responseData = await response.json();
            setProducts(responseData);
        } catch (error) {
            console.error('Error cargando productos:', error);
        }
    }

    const [name, setName] = useState(null);
    const [price, setPrice] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const createProduct = (event)=>{
        event.preventDefault();
        setLoading(true);

        fetch(`https://parcial3-rouge.vercel.app/v1/restaurant/product`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"id": 1, "name": name, "price": price, "activate": true})
        })
        .then(response => {
            setLoading(false);
            return response.json();
        })
        .then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setError('');
                setProducts([...products, data]);
                setName('');
                setPrice('');
                console.log("se creo correctamente el producto");
            }
        });
    }

    const deleteProduct = async (name) => {
        try {
            const response = await fetch(`https://parcial3-rouge.vercel.app/v1/restaurant/product?name=${name}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const updatedProducts = products.filter(p => p.name !== name);
                setProducts(updatedProducts);
                console.log("Producto eliminado correctamente");
            } else {
                console.error('Error al eliminar producto:', response.statusText);
            }
        } catch (error) {
            console.error('Error al eliminar producto:', error.message);
        }
    };

    const [isEdit, setIsEdit] = useState(false);
    const showEditProduct = (product) => {
        setIsEdit(true);
        setName(product.name);
        setPrice(product.price);
    };

    const editProduct = (event) => {
        event.preventDefault();
        setLoading(true);

        fetch(`https://parcial3-rouge.vercel.app/v1/restaurant/product`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ "name": name, "price": price, "activate": true})
        })
        .then(response => {
            setLoading(false);
            return response.json();
        })
        .then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setError('');
                const updatedProducts = products.map(p => p.name === data.name ? data : p);
                setProducts(updatedProducts);
                setName('');
                setPrice('');
                setIsEdit(false);
                console.log("se edito correctamente el producto");
            }
        });
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="homeAdminProducts p-2">
            <h2>Productos</h2>
            <form onSubmit={isEdit ? editProduct : createProduct}>
                <div className='d-flex'>
                    <div className='col-5 me-2'>
                        <div className="mb-3">
                            <label htmlFor="nameProduct" className="form-label">Nombre</label>
                            <input className="form-control" type="text" aria-label="Ingresar nombre" value={name || ''} onChange={(e)=> setName(e.target.value)} disabled={isEdit} />
                        </div>
                    </div>
                    <div className='col-4 me-2'>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">Precio</label>
                            <input type="number" id="inputPrice" className="form-control" value={price || ''} onChange={(e)=> setPrice(e.target.value)} />
                        </div>
                    </div>
                    <div className='col-3 homeAdmin__action'>
                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">&nbsp;</label><br />
                            <button className="btn btn-primary-white" type="submit" disabled={loading}>
                                {loading ? 'Guardando...' : isEdit ? 'Editar' : 'Crear'}
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {error && <div className="alert alert-danger">{error}</div>}

            <table className="table">
                <thead>
                    <tr>
                        <th width="50%">Nombre</th>
                        <th width="30%">Precio</th>
                        <th width="20%"></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                    <tr key={index}>
                        <td>{product.name}</td>
                        <td>${product.price}</td>
                        <td>
                            <div className="d-flex">
                                <div className="mx-2"><button type="button" className="btn btn-secondary btn-secondary-violet" onClick={() => showEditProduct(product)}>Editar</button></div>
                                <div className="mx-2"><button type="button" className="btn btn-danger" onClick={() => deleteProduct(product.name)}>Eliminar</button></div>
                            </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default HomeAdminProducts;