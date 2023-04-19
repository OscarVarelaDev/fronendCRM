import { useContext, useState } from 'react'
import Swal from 'sweetalert2'
import clienteAxios from '../../config/axios'
import {useNavigate} from 'react-router-dom'
import { CRMContext } from '../../context/CRMcontext'


const Login = () => {
    const [auth, setAuth] = useContext(CRMContext)
    const navigate = useNavigate()
    const [credenciales, setCredenciales] = useState({
        email: "",
        password: ""
    })


    const leerDatos = (e) => {
      
        setCredenciales({
            ...credenciales,
            [e.target.name]: e.target.value

        })


    }

    const iniciarSesion = async(e) => {
        e.preventDefault()
        try {
            const respuesta = await clienteAxios.post('/iniciar-sesion',credenciales)
            const {token}= respuesta.data
         
            localStorage.setItem('token',token)
            setAuth({
                token,
                auth:true
            })
           
            Swal.fire({
              icon: 'success',
                title: 'Bienvenido',
                text: 'Iniciaste Sesion Correctamente'
            })
            navigate('/clientes')
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error'
            })


        }
    }
    return (
        <div className='login'>
            <h2>Iniciar Sesion</h2>
            <div className="contenedor-formulario">
                <form onSubmit={iniciarSesion} >
                    <div className='campo'>
                        <label >Email </label>
                        <input type="text"
                            name='email'
                            placeholder='Email para Iniciar Sesion'
                            onChange={leerDatos} />

                    </div>
                    <div className='campo'>
                        <label >Password </label>
                        <input type="password"
                            name='password'
                            placeholder='Ingresa tu password'
                            onChange={leerDatos} />

                    </div>
                    <input type="submit" className='btn btn-verde btn-block' value={'Iniciar Sesión'} />
                </form>
            </div>

        </div>
    )
}

export default Login