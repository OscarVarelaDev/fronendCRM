import React from 'react'

const Producto = ({
    producto,
    index,
    sumarProductos,
    restarProductos,
    eliminarProducto
}) => {
    

    return (
        <>

            <li>
                <div className="texto-producto">
                    <p className="nombre">{producto.nombre}</p>
                    <p className="precio">Precio por cada pieza: ${producto.precio}</p>
                </div>
                <div className="acciones">
                    <div className="contenedor-cantidad">
                        <i className="fas fa-minus"
                         onClick={() => 
                            { restarProductos(index) }}
                        ></i>
                        <p type="text" name="cantidad" >{producto.cantidad}</p>
                        <i className="fas fa-plus"
                          onClick={() => {
                         sumarProductos(index)

                    }}
                        ></i>
                    </div>
                    <button type="button" className="btn btn-rojo"
                     onClick={() => {
                        eliminarProducto(producto._id)
                    }}>
                        <i className="fas fa-minus-circle"
                           
                        ></i>
                        Eliminar Producto
                    </button>
                </div>
            </li>

        </>

    )
}

export default Producto