import { useState } from 'react'
import configAxios from '../../config/axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
const NuevoProducto = () => {
  const navigate = useNavigate()
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: '',


  })

const [archivo, setArchivo] = useState('')

  const handleSubmit = (e) => {

    setNuevoProducto({
      ...nuevoProducto,
      [e.target.name]: e.target.value,
    })


  }
  const handleFile = (e) => {
    setArchivo(e.target.files[0])
  }

  const validarFormulario = () => {
    if (nuevoProducto.nombre.trim() === '' || nuevoProducto.precio.trim() === '') {
      return true
    }
  }
  const sendNewProduct = async(e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('nombre', nuevoProducto.nombre)
    formData.append('precio', nuevoProducto.precio)
    formData.append('imagen', archivo)

    try {
      const res = await configAxios.post('/producto/nuevoProducto', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (res.status === 200) {
        Swal.fire(
          'Producto Creado!',
           res.data.message,
          'success'
        )
      }
      navigate('/productos')

    }
    catch (error) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salio mal, vuelve a cargar tu producto!',
      })
    }

  }

  return (
    <main className="caja-contenido col-9">
      <h2>Nuevo Producto</h2>

      <form
        onSubmit={sendNewProduct}
      >
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
            onChange={handleSubmit} />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input type="number"
            name="precio"
            min="0.00"
            step="0.01"
            placeholder="Precio"
            onChange={handleSubmit} />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          <input
            type="file"
            name="imagen"
            onChange={handleFile} />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Producto"
            disabled={validarFormulario()}
          />
        </div>
      </form>

    </main>
  )
}

export default NuevoProducto