import React from 'react'
import Navegacion from "./Navegacion"
import { CRMContext } from '../../context/CRMcontext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const [auth, setAuth] = useContext(CRMContext)
    const navigate = useNavigate()
    const cerrarSesion = () => {
        setAuth({
            token: '',
            auth: false
        })
        localStorage.setItem('token', '')
        navigate('/iniciar-sesion')
    }
   

    return (
        <>
            <header className='barra'>
                <div className='contenedor'>
                    <div className='contenido-barrar'>
                        <h1>CRM -Administrador de Clientes</h1>
                       { auth.auth && (
                       
                       <button
                            type='button'
                            className='btn btn-rojo'
                            style={{ cursor: 'pointer', 
                                fontSize: '1.6rem',
                                padding: '1rem 2rem',
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                border: 'none',
                                background: 'red',
                                transition: 'background-color .3s ease',
                                borderRadius: '10px',
                                color: '#fff',
                                position: 'absolute',
                                left: '75%',
                        }}
                            onClick={() => {
                                cerrarSesion()
                            }}
                        >
                            <i className='fas fa-sign-out-alt'></i>
                            Cerrar Sesion
                        </button>
                          )
}
                    </div>
                </div>
            </header>
            <Navegacion />


        </>
    )
}

export default Header