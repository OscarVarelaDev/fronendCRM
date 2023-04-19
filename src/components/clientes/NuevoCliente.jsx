
import { useState } from "react"
import Swal from "sweetalert2"
import clienteAxios from '../../config/axios'
import { useNavigate } from "react-router-dom"



const NuevoCliente = () => {
  const [cliente, setCliente] = useState({
    nombre: '',
    apellido: '',
    empresa: '',
    email: '',
    telefono: ''
  })
const navigate = useNavigate()

  const handleSubmit = (e) => {

    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,

    })

  }

  const validarCliente = () => {
    const valido = !Object.values(cliente).every(element => element.trim() !== '')
    return valido
  }

  const updateClient = (e) => {
    e.preventDefault();
    try {
      clienteAxios.post('/cliente/nuevo', cliente)
          .then(res => {
          if(res.data.code === 11000){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'El cliente ya existe!',

             })
          }else{
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Cliente agregado'

            })
          }
          navigate('/clientes')
        })


    } catch (error) {
      res.send(error)
    }
  }

  return (

    <>
      <h2>Nuevo Cliente</h2>
      <form onSubmit={updateClient}>
        <legend>Llena todos los campos</legend>
        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            onChange={handleSubmit}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input type="text" 
          placeholder="Apellido 
          Cliente" name="apellido" onChange={handleSubmit} />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input type="text" placeholder="Empresa Cliente" name="empresa" onChange={handleSubmit} />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input type="email" placeholder="Email Cliente" name="email" onChange={handleSubmit} />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input type="text" placeholder="Teléfono Cliente" name="telefono" onChange={handleSubmit} />
        </div>

        <div className="enviar">
          <input type="submit"
            className="btn btn-azul"
            value="Agregar Cliente"
            disabled={validarCliente()}
          />
        </div>

      </form>

    </>
  )
}

export default NuevoCliente