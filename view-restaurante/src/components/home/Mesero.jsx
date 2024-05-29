import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function HomeMesero({ userName }){
    const [products, setProducts] = useState([]);
    async function getProducts() {
        try {
            const response = await fetch(`http://localhost:4000/v1/restaurant/products`);
            const responseData = await response.json();
            setProducts(responseData);
        } catch (error) {
            console.error('Error cargando productos:', error);
        }
    }

    const [mesa, setMesa] = useState(null);
    const [product, setProduct] = useState(null);
    const [amount, setAmount] = useState(null);
    const [order, setOrder] = useState({});
    const [orderCreated, setOrderCreated] = useState(false);
    const addProductSale = (event)=>{
        event.preventDefault();

        const newProduct = {
            producto: product.name,
            cantidad: amount,
            nota: "",
            total: product.price * amount
        };

        if (order.id) {
            const updatedOrder = {
                ...order,
                productos: [...order.productos, newProduct]
            };

            const newTotal = calculateTotal(updatedOrder.productos);
            updatedOrder.totalventa = newTotal;

            setOrder(updatedOrder);
        } else {
            const newOrder = {
                id: uuidv4(),
                mesero: userName,
                mesa: mesa,
                estado: "proceso",
                productos: [newProduct]
            };

            const newTotal = calculateTotal(newOrder.productos);
            newOrder.totalventa = newTotal;
            setOrder(newOrder);

            setOrderCreated(true);
        }

    }

    const calculateTotal = (orderProducts) => {
        let total = 0;
        if(orderProducts) {
            orderProducts.forEach(product => {
                total += product.total;
            });
        }

        return total;
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const createOrder = (order)=>{
        console.log("order", order);
        setLoading(true);

        fetch(`http://localhost:4000/v1/restaurant/sales`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(order)
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
                setOrder([]);
                setMesa(null);
                setProduct(null);
                setAmount(null);
                setOrderCreated(false);
                console.log("se creo correctamente la orden");
            }
        });
    }

    const deleteProductFromOrder = (productIndex) => {
        const updatedOrder = { ...order, productos: [...order.productos] };
        const deletedProductTotal = order?.productos[productIndex]?.total ? updatedOrder.productos[productIndex].total : 0;
        updatedOrder.productos.splice(productIndex, 1);

        if (updatedOrder.productos.length === 0) {
            setOrder({});
            setOrderCreated(false);
        } else {
            const newTotal = calculateTotal(updatedOrder?.productos);
            updatedOrder.totalventa -= deletedProductTotal;
            updatedOrder.totalventa = newTotal;

            setOrder(updatedOrder);
        }

    };

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className="homeMesero p-2">
            <h2>Pedidos</h2>

            <form onSubmit={addProductSale}>
                <div className='d-flex'>
                    <div className='col-3 me-2'>
                        <div className="mb-3">
                            <label htmlFor="rol" className="form-label">Mesa</label>
                            <select className="form-select" aria-label="Seleccione una mesa" onChange={(e)=> setMesa(e.target.value)} disabled={orderCreated}>
                                <option defaultValue>Seleccione una mesa</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </div>
                    </div>
                    <div className='col-3 me-2'>
                        <div className="mb-3">
                            <label htmlFor="rol" className="form-label">Producto</label>
                            <select className="form-select" aria-label="Seleccione un producto" onChange={(e)=> setProduct(products.find(p => p.name === e.target.value))}>
                                <option defaultValue>Seleccione un producto</option>
                                {products.map((product, index) => (
                                    <option value={product.name} key={index}>{product.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='col-3 me-2'>
                        <div className="mb-3">
                            <label htmlFor="user" className="form-label">Cantidad</label>
                            <input className="form-control" type="number" aria-label="Ingresar cantidad" onChange={(e)=> setAmount(e.target.value)} />
                        </div>
                    </div>
                    <div className='col-3 homeAdmin__action'>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">&nbsp;</label><br />
                            <button className="btn btn-primary-white" type="submit">
                                Agregar
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            {order.id && (
            <table className="table">
                <thead>
                    <tr>
                        <th width="50%">Producto</th>
                        <th width="10%">Cantidad</th>
                        <th width="20%">Precio</th>
                        <th width="20%"></th>
                    </tr>
                </thead>
                <tbody>
                    {order.productos.map((producto, index) => (
                    <tr key={index}>
                        <td>{producto.producto}</td>
                        <td>{producto.cantidad}</td>
                        <td>${producto.total}</td>
                        <td>
                            <div className="d-flex">
                                <div className="mx-2"><button type="button" className="btn btn-danger" onClick={() => deleteProductFromOrder(index)}>Eliminar</button></div>
                            </div>
                        </td>
                    </tr>
                    ))}
                    <tr>
                        <td colSpan={2}>Total</td>
                        <td colSpan={2}>${order.totalventa}</td>
                    </tr>
                </tbody>
            </table>
            )}

            {order.id && (
            <div className="d-grid gap-2">
                <button className="btn btn-primary-white" type="button" onClick={() => createOrder(order)}>Crear orden</button>
            </div>
            )}
        </div>
    )
}

export default HomeMesero;