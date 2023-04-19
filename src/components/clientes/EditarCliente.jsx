import React, { useEffect } from 'react'
import { useState } from "react"
import Swal from "sweetalert2"
import clienteAxios from '../../config/axios'
import { useNavigate, useParams } from "react-router-dom"


const EditarCliente = () => {
    const [datosCliente, setDatosCliente] = useState({
        nombre: '',
        apellido: '',
        empresa: '',
        email: '',
        telefono: ''
    })
    const navigate = useNavigate()
    const { id } = useParams()

    const consultarAPI = async () => {
        const clientesConsulta = await clienteAxios.get(`/cliente/${id}`)
        setDatosCliente(clientesConsulta.data)

    }
    useEffect(() => {
        consultarAPI()

    }, [])


    const handleSubmit = (e) => {


        setDatosCliente({
            ...datosCliente,
            [e.target.name]: e.target.value,

        })

    }


    const validarCliente = () => {
        if (datosCliente.nombre.trim() === '' || datosCliente.apellido.trim() === '' || datosCliente.empresa.trim() === '' || datosCliente.email.trim() === '' || datosCliente.telefono.trim() === '') {
            const valido = true
            return valido
        }

    }

    const handleEditarCliente = (e) => {
        e.preventDefault();

        clienteAxios.put(`/cliente/${id}`, datosCliente)
            .then(res => {
                if (res.data.code === 11000) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Error al actualizar cliente, intente de nuevo!',
                    })
                } else {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Cliente editado'

                    })
                }
                navigate('/clientes')
            })
    }



    return (

        <>
            <h2>Editar Cliente</h2>
            <form
                onSubmit={handleEditarCliente}
            >
                <legend>Llena todos los campos</legend>
                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre Cliente"
                        name="nombre"
                        onChange={handleSubmit}
                        value={datosCliente.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" placeholder="Apellido Cliente" name="apellido"
                        value={datosCliente.apellido}
                        onChange={handleSubmit} />
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" placeholder="Empresa Cliente" name="empresa" onChange={handleSubmit}
                        value={datosCliente.empresa}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email"
                        placeholder="Email Cliente"
                        name="email"
                        disabled
                        onChange={handleSubmit}
                        value={datosCliente.email}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="text" placeholder="Teléfono Cliente" name="telefono" onChange={handleSubmit}
                        value={datosCliente.telefono}
                    />
                </div>

                <div className="enviar">
                    <input type="submit"
                        className="btn btn-azul"
                        value="Guardar Cliente"
                        disabled={validarCliente()}
                    />
                </div>

            </form>

        </>
    )
}



export default EditarCliente