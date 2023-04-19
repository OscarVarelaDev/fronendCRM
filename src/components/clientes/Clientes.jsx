import { useContext, useEffect, useState } from 'react'
import clienteAxios from '../../config/axios'
import Cliente from './Cliente'
import { Link } from 'react-router-dom'
import Spinner from '../layout/Spinner'
import { CRMContext } from '../../context/CRMcontext'
import { useNavigate } from 'react-router-dom'
const Clientes = () => {
  const [clientes, setClientes] = useState([])
  const navigate = useNavigate()
  const [auth, setAuth] = useContext(CRMContext)

 


  useEffect(() => {

    if (!auth.token !== '') {
      const consultarAPI = async () => {
        try {
          const clientesConsulta = await clienteAxios.get('/clientes', {
            headers: {
              Authorization: `Bearer ${auth.token}`
            }
          })
          setClientes(clientesConsulta.data)
        }
        catch (error) {
          if (error.response.status === 500) {
            navigate('/iniciar-sesion')
          }
        }
      }
      consultarAPI()
    }else{
      navigate('/iniciar-sesion')

    }
  }, [clientes])

  if (!auth.auth) {
    navigate('/iniciar-sesion')
  }

  if (!clientes.length) return <Spinner />

  return (
    <>
      <h2>Clientes</h2>
      <Link to={'/cliente/clienteNuevo'} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>

      <ul className='listado-clientes'>
        {clientes.map(cliente => (
          <Cliente cliente={cliente} key={cliente._id} />)
        )}
      </ul>
    </>
  )
}

export default Clientes