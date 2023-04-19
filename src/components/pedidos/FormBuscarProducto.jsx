import React from 'react'

const FormBuscarProducto = ({
    buscarProducto,
    leerProducto
}) => {
    return (
        <form onSubmit={buscarProducto}>
            <legend>Busca un Producto</legend>

            <div className="campo">
                <label>Productos:</label>
                <input
                    type="text"
                    placeholder="Nombre Productos"
                    name="productos"
                    onChange={leerProducto}
                />
            </div>
            <input
                type='submit'
                className='btn btn-azul btn-block'
                value={"Buscar Producto"}
            />
        </form>
    )
}

export default FormBuscarProducto