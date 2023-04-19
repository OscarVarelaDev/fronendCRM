import React from 'react'
import {Link} from 'react-router-dom'
import clienteAxios from '../../config/axios'
import Swal from 'sweetalert2'
const Producto = ({ productos }) => {

  const eliminarProducto=(id)=>{
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Un producto eliminado no se puede recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        clienteAxios.delete(`/producto/${id}`)
        .then(res=>{
          Swal.fire(
            'Eliminado!',
            res.data.mensaje,
            'success'
          )
        })
        .catch(err=>{
          console.log(err)
        })
      }
    })
  }

  return (
<>
      {productos.map((producto,index) => {
        return (
          <li className="producto" key={producto._id}>
            <div className="info-producto">
              <p className="nombre">{producto.nombre}</p>
              <p className="precio">${producto.precio}.00 </p>
              <img src={`${process.env.REACT_APP_BACKEND_URL}/${producto.imagen}`|| "Sin imagen de producto..."} />
            </div>
            <div className="acciones">
              <Link to={`/producto/editarProducto/${producto._id}`} className="btn btn-azul">
                <i className="fas fa-pen-alt"></i>
                Editar Producto
              </Link>
              <button
               type="button"
                className="btn btn-rojo btn-eliminar"
                style={{
                  fontFamily: 'Roboto, sans-serif',
                }}
                onClick={()=>{
                  eliminarProducto(producto._id)
                }}
                >
                <i className="fas fa-times"></i>
                Eliminar Producto
              </button>
            </div>
          </li>
        )
      })}
   </>

  )
}

export default Producto