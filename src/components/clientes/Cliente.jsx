import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import clienteAxios from '../../config/axios'


const Cliente = ({ cliente }) => {
    const { nombre, apellido, empresa, email, telefono, _id } = cliente

    const deleteClient = (_id) => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "Un cliente eliminado no se puede recuperar",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                clienteAxios.delete(`/cliente/${_id}`)
                    .then(res => {
                        console.log(res)
                    })
                Swal.fire(
                    'Eliminado!',
                    'El cliente ha sido eliminado',
                    'success'
                )
            }
        }
        )



    }


    return (
        <div >
            <li className="cliente">
                <div className="info-cliente">
                    <p className="nombre">{nombre + " " + apellido}</p>
                    <p className="empresa">{empresa}</p>
                    <p>{email}</p>
                    <p>Tel:{telefono}</p>
                </div>


                <div className="acciones">

                    <Link to={`/pedido/pedidoNuevo/${_id}`} className="btn btn-amarillo">
                        <i className="fas fa-shopping-cart"></i>
                        Nuevo Pedido
                    </Link>
                    <Link to={`/cliente/editarCliente/${_id}`} className="btn btn-azul">
                        <i className="fas fa-pen-alt"></i>
                        Editar Cliente
                    </Link>

                    <button
                        type="button"
                        className="btn btn-rojo btn-eliminar"
                      style={{fontFamily: 'Arial'}}
                        onClick={() => {
                            deleteClient(_id)
                        }}
                    >
                        <i className="fas fa-times"></i>
                        Eliminar Cliente
                    </button>
                </div>
            </li>
        </div>


    )
}

export default Cliente