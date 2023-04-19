import React from 'react'

const Registrarse = () => {
  return (
    <>
    <div className="contenedor">
        <div className="contenido">
            <h1>Registrarse</h1>

            <form>
                <div className="campo">
                    <label>Nombre</label>
                    <input
                        type="text"
                        placeholder="Nombre Usuario"
                        name="nombre"
                        required
                    />
                </div>
                    <div className="campo">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Email Usuario"
                            name="email"
                            required
                        />
                    </div>
                    <div className="campo">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Password Usuario"
                            name="password"
                            required
                        />
                    </div>
                    <div className="campo">
                        <label>Confirmar Password</label>
                        <input
                            type="password"
                            placeholder="Repetir Password"
                            name="repetir"
                            required
                        />
                    </div>
                    <div className="enviar">
                        <input
                            type="submit"
                            className="btn btn-azul"
                            value="Registrarse"
                        />
                    </div>
            </form>
        </div>
    </div>
    </>
  )
}

export default Registrarse