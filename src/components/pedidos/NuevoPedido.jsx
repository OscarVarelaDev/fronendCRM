
import { useParams,useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import clienteAxios from '../../config/axios'
import Swal from 'sweetalert2'
import FormBuscarProducto from './FormBuscarProducto'
import Producto from './Producto'



const NuevoPedido = () => {
    const [cliente, setCliente] = useState({});
    const [busquedaProducto, setBusquedaProducto] = useState("");
    const [productos, setProductos] = useState([]);
    const [total, setTotal] = useState(0);
    const { id } = useParams()
    const navigate = useNavigate()

    const consultarCliente = async () => {
        const res = await clienteAxios.get(`/cliente/${id}`)
        setCliente(res.data)
    }
    useEffect(() => {
        consultarCliente();
        actualizarTotal();
    }, [productos])

    const { nombre, apellido, empresa, email, telefono } = cliente

    const buscarProducto = async (e) => {
        e.preventDefault()
        const resultadoBusqueda = await clienteAxios.get(`/productos/busqueda/${busquedaProducto}`)
        if (resultadoBusqueda.data[0]) {
            let resultadoProducto = resultadoBusqueda.data[0]
            resultadoProducto.cantidad = 0
            //validar que no se repita el producto
            if (productos.some(producto => producto._id === resultadoProducto._id)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Producto ya agregado',
                    text: 'El producto ya se encuentra en la lista',
                })
                return;
            }
            setProductos([...productos, resultadoProducto])


        } else {
            Swal.fire({
                icon: 'question',
                title: 'Producto no encontrado',
                text: 'Intenta con el nombre de otro producto',
            })
        }


    }

    const leerProducto = (e) => {
        setBusquedaProducto(e.target.value)
    }
    const restarProductos = (index) => {
        const todosProductos = [...productos]
        if (todosProductos[index].cantidad === 0) {
            Swal.fire
                ({
                    title: "Error",
                    text: "No puede tener cantidades negativas",
                    icon: "error",
                    confirmButtonText: "Aceptar"
                });
            return;

        };
        todosProductos[index].cantidad--
        setProductos(todosProductos)
    }
    const sumarProductos = (index) => {
        const todosProductos = [...productos]
        todosProductos[index].cantidad++
        setProductos(todosProductos)

    }
    const actualizarTotal = () => {
        if (productos.length === 0) {
            setTotal(0)
            return;
        }
        let nuevoTotal = 0;
        productos.map(producto => nuevoTotal += (producto.precio * producto.cantidad))
        setTotal(nuevoTotal)
    }

    const eliminarProducto = (id) => {
        const todosProductos = productos.filter(producto => producto._id !== id)
        if (todosProductos) {
            Swal.fire
                ({
                    title: "Producto eliminado",
                    text: "El producto se elimino correctamente",
                    icon: "success",
                    confirmButtonText: "Aceptar"
                });
            setProductos(todosProductos)
            return;
        }

    }
    const sendPedido = async (e) => {
        e.preventDefault()
       
        const pedido = {
            "cliente": id,
            "pedido": [productos],
            "total": total
        }
        console.log(pedido)
        const res = await clienteAxios.post(`/pedido/nuevoPedido/${id}`, pedido)
        if (res.status === 200) {
            Swal.fire
                ({
                    title: "Pedido Creado",
                    text: "El pedido se creo correctamente",
                    icon: "success",
                    confirmButtonText: "Aceptar"
                });
                navigate('/pedidos')
        }
        else {
            Swal.fire
                ({
                    title: "Error",
                    text: "El pedido no se pudo crear",
                    icon: "error",
                    confirmButtonText: "Aceptar"
                });
        }
       


    }


    return (
        <main className="caja-contenido col-9">
            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>Nombre:{nombre + " " + apellido}</p>
                <p>Empresa:{empresa}</p>
                <p>Correo:{email}</p>
                <p>Telefono:{telefono}</p>
            </div>

            <FormBuscarProducto
                buscarProducto={buscarProducto}
                leerProducto={leerProducto}

            />
            <ul className="resumen">

                {
                    productos.map((producto, index) => (
                        <Producto
                            key={producto._id}
                            index={index}
                            producto={producto}
                            sumarProductos={sumarProductos}
                            restarProductos={restarProductos}
                            eliminarProducto={eliminarProducto}
                        />
                    ))

                }


            </ul>
            <div className="campo">
                {total > 0 && (
                    <p className="total" style={{ textTransform: "uppercase" }}>
                        Total:
                        <span style={{
                            fontSize: "3rem",
                            fontWeight: "bold",
                            color: "red",
                        }
                        }>${total.toFixed(2)}</span>
                    </p>

                )}
            </div>
            <div className="campo">
                {
                    total > 0 && (
                        <form
                            onSubmit={sendPedido}
                        >

                            <div className="campo">
                                <input type="submit" className="btn btn-verde btn-block " style={{
                                    marginTop: "2rem", borderRadius: "5px", fontSize: "1.5rem", fontWeight: "bold", padding: "1rem 2rem", textTransform: "uppercase", letterSpacing: "1px", border: "none", background: "#00d1b2", color: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24),", height: "60px", width: "200px"

                                }} value="Realizar Pedido" />
                            </div>
                        </form>
                    )

                }
            </div>

        </main>
    )
}

export default NuevoPedido