import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import configAxios from '../../config/axios'
import Spinner from '../layout/Spinner'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const EditarProducto = () => {
  const navigate =useNavigate()
  const { id } = useParams()
  const [file, setFile] = useState('')
  const [productoEditar, setProductoEditar] = useState({
    nombre: "",
    precio: "",
    imagen: "",
  })
  const obtenerproductoEditar = async () => {
    const productoEditarConsulta = await configAxios.get(`/producto/${id}`)
    setProductoEditar(productoEditarConsulta.data)

  }
  useEffect(() => {
    obtenerproductoEditar()

  }, [])

  const handleData = (e) => {
    e.preventDefault()
    setProductoEditar({
      ...productoEditar,
      [e.target.name]: e.target.value,
    })

  }

  const handleFile = (e) => {

    setFile(e.target.files[0])
  }

  const validateForm = () => {
    if (productoEditar.nombre == "" || productoEditar.precio == "") {
      return true
    }

  }



  const handleSubmit = async (e) => {
  
    e.preventDefault()
    const formData = new FormData()
    formData.append('nombre', productoEditar.nombre)
    formData.append('precio', productoEditar.precio)
    formData.append('imagen', file)



    try {
      const res = await configAxios.put(`/producto/editarProducto/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (res.status === 200) {
        Swal.fire(
          '¡Editado correctamente!',
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
        text: 'Algo salio mal, vuelve a editar tu producto !',
      })
    }

  }


  return (
    <main className="caja-contenido col-9">
      <h2>Editar productoEditar</h2>

      <form
        onSubmit={handleSubmit}
      >
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre productoEditar"
            name="nombre"
            defaultValue={productoEditar.nombre}
            onChange={handleData}
          />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input type="number"
            name="precio"
            min="0.00"
            step="0.01"
            placeholder="Precio"
            defaultValue={productoEditar.precio}
            onChange={handleData}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          {
           file ? <img src={URL.createObjectURL(file)} alt="imagen" width="200" /> : <img src={
            `${process.env.REACT_APP_BACKEND_URL}/${productoEditar.imagen}`
           } alt="imagen" width="200" />
          }
       
          <input
            type="file"
            name="imagen"
            onChange={handleFile}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Guardar producto"
            disabled={validateForm()}
          />
        </div>
      </form>

    </main>
  )
}

export default EditarProducto